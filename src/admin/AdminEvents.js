import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import AdminShell from "./AdminShell";
import { db, storage } from "../firebase/firebaseconfig";
import { convertImageToWebp, getEventStoragePath, resolveEventImage } from "./adminUtils";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [drafts, setDrafts] = useState({});
  const [pendingFiles, setPendingFiles] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadEvents = async () => {
    setLoading(true);

    try {
      const snapshot = await getDocs(collection(db, "events"));

      const loadedEvents = await Promise.all(
        snapshot.docs.map(async (snapshotDoc) => {
          const eventItem = {
            docId: snapshotDoc.id,
            ...snapshotDoc.data()
          };

          return {
            ...eventItem,
            image: await resolveEventImage(eventItem, storage)
          };
        })
      );

      setEvents(loadedEvents);
    } catch (error) {
      setStatus(`Unable to load events right now. ${error?.message || ""}`.trim());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const sortedEvents = useMemo(
    () =>
      [...events].sort((a, b) => {
        const left = new Date(`${a.date}T${a.time || "00:00"}`).getTime();
        const right = new Date(`${b.date}T${b.time || "00:00"}`).getTime();
        return left - right;
      }),
    [events]
  );

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = Date.now();

    return sortedEvents.reduce(
      (groups, eventItem) => {
        const eventTimestamp = new Date(
          `${eventItem.date}T${eventItem.endTime || eventItem.time || "23:59"}`
        ).getTime();

        if (eventTimestamp >= now) {
          groups.upcomingEvents.push(eventItem);
        } else {
          groups.pastEvents.push(eventItem);
        }

        return groups;
      },
      {
        upcomingEvents: [],
        pastEvents: []
      }
    );
  }, [sortedEvents]);

  const beginEditing = (event) => {
    setEditingId(event.docId);
    setDrafts((current) => ({
      ...current,
      [event.docId]: {
        title: event.title || "",
        date: event.date || "",
        time: event.time || "",
        endTime: event.endTime || "",
        priority: event.priority || "",
        requestedBy: event.requestedBy || "",
        link: event.link || "",
        updatedBy: ""
      }
    }));
  };

  const updateDraft = (docId, field, value) => {
    setDrafts((current) => ({
      ...current,
      [docId]: {
        ...current[docId],
        [field]: value
      }
    }));
  };

  const cancelEditing = (docId) => {
    setEditingId(null);
    setPendingFiles((current) => {
      const next = { ...current };
      delete next[docId];
      return next;
    });
  };

  const handleSave = async (eventItem) => {
    const draft = drafts[eventItem.docId];

    if (!draft?.title || !draft.date || !draft.time || !draft.link || !draft.priority || !draft.requestedBy || !draft.updatedBy?.trim()) {
      setStatus("Please complete every field before saving.");
      return;
    }

    if (draft.endTime) {
      const eventStartDateTime = new Date(`${draft.date}T${draft.time}`);
      const eventEndDateTime = new Date(`${draft.date}T${draft.endTime}`);

      if (eventEndDateTime < eventStartDateTime) {
        setStatus("Event end time must be after the start time.");
        return;
      }
    }

    setStatus(`Saving ${draft.title}...`);

    try {
      const nextData = { ...draft };
      delete nextData.updatedBy;
      nextData.lastUpdatedBy = draft.updatedBy.trim();
      nextData.lastUpdatedAt = Date.now();

      const replacementFile = pendingFiles[eventItem.docId];
      if (replacementFile) {
        const processedBanner = await convertImageToWebp(replacementFile);
        const storagePath = getEventStoragePath(eventItem);
        const bannerRef = ref(storage, storagePath);

        await uploadBytes(bannerRef, processedBanner, {
          contentType: "image/webp"
        });

        nextData.image = await getDownloadURL(bannerRef);
        nextData.storagePath = storagePath;
      }

      await updateDoc(doc(db, "events", eventItem.docId), nextData);

      setStatus("Event updated successfully.");
      setEditingId(null);
      await loadEvents();
    } catch (error) {
      setStatus("Unable to save the event right now.");
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    setStatus(`Deleting ${deleteTarget.title}...`);

    try {
      const storagePath = getEventStoragePath(deleteTarget);

      try {
        await deleteObject(ref(storage, storagePath));
      } catch (error) {
        // Continue so Firestore cleanup still succeeds if the file is already gone.
      }

      await deleteDoc(doc(db, "events", deleteTarget.docId));
      setStatus("Event deleted successfully.");
      setDeleteTarget(null);
      await loadEvents();
    } catch (error) {
      setStatus("Unable to delete the event right now.");
    }
  };

  return (
    <AdminShell
      title="Manage Events"
      subtitle="Edit event details, replace banners, and remove outdated entries."
    >
      {status && (
        <Alert severity="info" sx={{ mb: 3 }}>
          {status}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : sortedEvents.length === 0 ? (
        <Typography color="text.secondary">
          No events are currently stored in Firestore.
        </Typography>
      ) : (
        <Stack spacing={3}>
          <EventSection
            title="Upcoming Events"
            events={upcomingEvents}
            editingId={editingId}
            drafts={drafts}
            pendingFiles={pendingFiles}
            beginEditing={beginEditing}
            updateDraft={updateDraft}
            cancelEditing={cancelEditing}
            handleSave={handleSave}
            setPendingFiles={setPendingFiles}
            setDeleteTarget={setDeleteTarget}
          />

          <EventSection
            title="Past Events"
            events={pastEvents}
            emptyMessage="No past events yet."
            editingId={editingId}
            drafts={drafts}
            pendingFiles={pendingFiles}
            beginEditing={beginEditing}
            updateDraft={updateDraft}
            cancelEditing={cancelEditing}
            handleSave={handleSave}
            setPendingFiles={setPendingFiles}
            setDeleteTarget={setDeleteTarget}
          />
        </Stack>
      )}

      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently remove the event{deleteTarget ? ` "${deleteTarget.title}"` : ""} from Firestore and delete its banner from Storage.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </AdminShell>
  );
}

function EventSection({
  title,
  events,
  emptyMessage = "No events in this section.",
  editingId,
  drafts,
  pendingFiles,
  beginEditing,
  updateDraft,
  cancelEditing,
  handleSave,
  setPendingFiles,
  setDeleteTarget
}) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {title}
      </Typography>

      {events.length === 0 ? (
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          {emptyMessage}
        </Typography>
      ) : (
        <Stack spacing={3}>
          {events.map((eventItem) => {
            const isEditing = editingId === eventItem.docId;
            const draft = drafts[eventItem.docId] || {};

            return (
              <Card key={eventItem.docId} variant="outlined">
                <CardContent>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    alignItems={{ xs: "stretch", md: "flex-start" }}
                  >
                    {eventItem.image && (
                      <CardMedia
                        component="img"
                        image={eventItem.image}
                        alt={eventItem.title}
                        sx={{
                          width: { xs: "100%", md: "260px" },
                          minWidth: { md: "260px" },
                          height: { xs: "180px", md: "160px" },
                          borderRadius: "12px",
                          objectFit: "cover",
                          backgroundColor: "#f4f4f5"
                        }}
                      />
                    )}

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      {isEditing ? (
                        <Stack spacing={2}>
                          <TextField
                            label="Event Title"
                            value={draft.title || ""}
                            onChange={(event) => updateDraft(eventItem.docId, "title", event.target.value)}
                          />

                          <TextField
                            label="Event Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={draft.date || ""}
                            onChange={(event) => updateDraft(eventItem.docId, "date", event.target.value)}
                          />

                          <TextField
                            label="Event Time"
                            type="time"
                            InputLabelProps={{ shrink: true }}
                            value={draft.time || ""}
                            onChange={(event) => updateDraft(eventItem.docId, "time", event.target.value)}
                          />

                          <TextField
                            label="Event End Time (Optional)"
                            type="time"
                            helperText="Leave blank to show this event as ALL DAY on the public page."
                            InputLabelProps={{ shrink: true }}
                            value={draft.endTime || ""}
                            onChange={(event) => updateDraft(eventItem.docId, "endTime", event.target.value)}
                          />

                          <FormControl fullWidth>
                            <InputLabel>Priority</InputLabel>
                            <Select
                              value={draft.priority || ""}
                              label="Priority"
                              onChange={(event) => updateDraft(eventItem.docId, "priority", event.target.value)}
                            >
                              <MenuItem value="Low">Low</MenuItem>
                              <MenuItem value="Medium">Medium</MenuItem>
                              <MenuItem value="High">High</MenuItem>
                            </Select>
                          </FormControl>

                          <FormControl fullWidth>
                            <InputLabel>Requested By</InputLabel>
                            <Select
                              value={draft.requestedBy || ""}
                              label="Requested By"
                              onChange={(event) => updateDraft(eventItem.docId, "requestedBy", event.target.value)}
                            >
                              <MenuItem value="Events">Events</MenuItem>
                              <MenuItem value="Creatives">Creatives</MenuItem>
                              <MenuItem value="Partnerships">Partnerships</MenuItem>
                              <MenuItem value="HR">HR</MenuItem>
                              <MenuItem value="Education">Education</MenuItem>
                              <MenuItem value="Projects">Projects</MenuItem>
                            </Select>
                          </FormControl>

                          <TextField
                            label="Event Link"
                            value={draft.link || ""}
                            onChange={(event) => updateDraft(eventItem.docId, "link", event.target.value)}
                          />

                          <TextField
                            label="Updated By"
                            helperText="Required so the team can track who changed this event."
                            value={draft.updatedBy || ""}
                            onChange={(event) => updateDraft(eventItem.docId, "updatedBy", event.target.value)}
                          />

                          <Button component="label" variant="outlined">
                            Replace Banner
                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/jpg,image/webp,image/avif,image/heic,image/heif"
                              hidden
                              onChange={(event) =>
                                setPendingFiles((current) => ({
                                  ...current,
                                  [eventItem.docId]: event.target.files?.[0] || null
                                }))
                              }
                            />
                          </Button>

                          {pendingFiles[eventItem.docId] && (
                            <Typography color="text.secondary">
                              New banner: {pendingFiles[eventItem.docId].name}
                            </Typography>
                          )}
                        </Stack>
                      ) : (
                        <>
                          <Typography variant="h5" sx={{ mb: 1 }}>
                            {eventItem.title}
                          </Typography>

                          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
                            <Chip label={eventItem.priority || "No priority"} />
                            <Chip label={eventItem.requestedBy || "Unknown team"} variant="outlined" />
                          </Stack>

                          <Typography sx={{ mb: 1 }}>
                            {eventItem.date} at {eventItem.endTime ? `${eventItem.time} - ${eventItem.endTime}` : "ALL DAY"}
                          </Typography>

                          <Typography
                            color="text.secondary"
                            sx={{
                              mb: 1,
                              overflowWrap: "anywhere"
                            }}
                          >
                            {eventItem.link}
                          </Typography>

                          <Typography color="text.secondary">
                            Storage path: {getEventStoragePath(eventItem)}
                          </Typography>

                          {eventItem.createdBy && (
                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                              Created by {eventItem.createdBy}
                              {eventItem.createdAt ? ` on ${new Date(eventItem.createdAt).toLocaleString("en-AU")}` : ""}
                            </Typography>
                          )}

                          {eventItem.lastUpdatedBy && (
                            <Typography color="text.secondary">
                              Last updated by {eventItem.lastUpdatedBy}
                              {eventItem.lastUpdatedAt ? ` on ${new Date(eventItem.lastUpdatedAt).toLocaleString("en-AU")}` : ""}
                            </Typography>
                          )}
                        </>
                      )}
                    </Box>

                    <Stack
                      direction={{ xs: "row", md: "column" }}
                      spacing={1.5}
                      sx={{
                        width: { xs: "100%", md: "auto" },
                        justifyContent: { xs: "flex-start", md: "flex-start" },
                        flexShrink: 0
                      }}
                    >
                      {isEditing ? (
                        <>
                          <Button
                            variant="contained"
                            onClick={() => handleSave(eventItem)}
                            sx={{ minWidth: { md: "120px" } }}
                          >
                            Save
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => cancelEditing(eventItem.docId)}
                            sx={{ minWidth: { md: "120px" } }}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            onClick={() => beginEditing(eventItem)}
                            sx={{ minWidth: { md: "120px" } }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setDeleteTarget(eventItem)}
                            sx={{ minWidth: { md: "120px" } }}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}

export default AdminEvents;
