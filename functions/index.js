const admin = require("firebase-admin");
const { onDocumentCreated, onDocumentUpdatedWithAuthContext } = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");

if (!admin.apps.length) {
  admin.initializeApp();
}

exports.notifyDiscordOnEventCreated = onDocumentCreated(
  {
    document: "events/{eventId}",
    region: "australia-southeast1",
    secrets: ["DISCORD_WEBHOOK_URL"]
  },
  async (event) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      logger.error("Missing DISCORD_WEBHOOK_URL secret.");
      return;
    }

    const data = event.data?.data();

    if (!data) {
      logger.warn("No event payload found for new Firestore event.", {
        eventId: event.params.eventId
      });
      return;
    }

    const embed = {
      title: "New AISoc Event Submission",
      color: 0x5865f2,
      fields: [
        { name: "Event Title", value: data.title || "Untitled Event" },
        { name: "Date", value: data.date || "Not provided" },
        { name: "Time", value: data.time ? data.time : "ALL DAY" },
        { name: "Priority", value: data.priority || "Not provided" },
        { name: "Requested By", value: data.requestedBy || "Not provided" },
        { name: "Submitted By", value: data.createdBy || "Not provided" },
        { name: "Event Link", value: data.link || "Not provided" },
        { name: "Banner Image", value: data.image || "Not provided" }
      ],
      timestamp: new Date().toISOString()
    };

    if (data.image) {
      embed.image = { url: data.image };
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          embeds: [embed]
        })
      });

      if (!response.ok) {
        const responseText = await response.text();
        logger.error("Discord webhook request failed.", {
          status: response.status,
          statusText: response.statusText,
          responseText,
          eventId: event.params.eventId
        });
      }
    } catch (error) {
      logger.error("Failed to send Discord notification.", {
        error: error instanceof Error ? error.message : String(error),
        eventId: event.params.eventId
      });
    }
  }
);

exports.notifyDiscordOnEventModified = onDocumentUpdatedWithAuthContext(
  {
    document: "events/{eventId}",
    region: "australia-southeast1",
    secrets: ["DISCORD_WEBHOOK_URL"]
  },
  async (event) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const before = event.data?.before?.data();
    const after = event.data?.after?.data();

    if (!webhookUrl || !after) return;

    const changedFields = [
      "title",
      "date",
      "time",
      "endTime",
      "priority",
      "requestedBy",
      "link",
      "image"
    ].filter((field) => before?.[field] !== after?.[field]);

    const embed = {
      title: `Event updated by ${after.lastUpdatedBy || after.requestedBy || "Unknown"}`,
      color: 0xf2c94c,
      fields: [
        { name: "Event Title", value: after.title || "Untitled Event" },
        { name: "Date", value: after.date || "Not provided" },
        { name: "Time", value: after.time ? after.time : "ALL DAY" },
        { name: "Priority", value: after.priority || "Not provided" },
        { name: "Requested By", value: after.requestedBy || "Not provided" },
        { name: "Updated By", value: after.lastUpdatedBy || "Not provided" },
        { name: "Changed Fields", value: changedFields.length ? changedFields.join(", ") : "Metadata only" },
        { name: "Event Link", value: after.link || "Not provided" }
      ],
      timestamp: new Date().toISOString()
    };

    if (after.image) embed.image = { url: after.image };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          embeds: [embed]
        })
      });

      if (!response.ok) {
        const responseText = await response.text();
        logger.error("Discord webhook request failed for updated event.", {
          status: response.status,
          statusText: response.statusText,
          responseText,
          eventId: event.params.eventId,
          changedFields
        });
      }
    } catch (error) {
      logger.error("Failed to send Discord notification for updated event.", {
        error: error instanceof Error ? error.message : String(error),
        eventId: event.params.eventId,
        changedFields
      });
    }
  }
);
