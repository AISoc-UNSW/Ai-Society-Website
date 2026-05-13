import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import AdminShell from "./AdminShell";
import { db, storage } from "../firebase/firebaseconfig";
import { buildStoragePath, convertImageToWebp } from "./adminUtils";

const initialFormState = {
  title: "",
  date: "",
  time: "",
  link: "",
  priority: "",
  requestedBy: "",
  updatedBy: ""
};

function AdminDashboard() {
  const [form, setForm] = useState(initialFormState);
  const [bannerFile, setBannerFile] = useState(null);
  const [status, setStatus] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value
    }));
  };

  const resetForm = () => {
    setForm(initialFormState);
    setBannerFile(null);
    setStatus("");
    setSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, date, time, link, priority, requestedBy, updatedBy } = form;

    if (!title || !date || !time || !link || !bannerFile || !priority || !requestedBy || !updatedBy.trim()) {
      setStatus("Please fill in all required fields.");
      return;
    }

    const eventDateTime = new Date(`${date}T${time}`);
    if (eventDateTime < new Date()) {
      setStatus("Cannot submit an event in the past.");
      return;
    }

    if (!isValidURL(link)) {
      setStatus("Event link must be a valid URL.");
      return;
    }

    setIsSubmitting(true);

    try {
      setStatus("Converting banner to WebP...");
      const processedBanner = await convertImageToWebp(bannerFile);

      setStatus("Uploading banner...");
      const eventId = `event_${Date.now()}`;
      const storagePath = buildStoragePath(eventId);
      const bannerRef = ref(storage, storagePath);

      await uploadBytes(bannerRef, processedBanner, {
        contentType: "image/webp"
      });

      const imageURL = await getDownloadURL(bannerRef);

      const timestamp = Date.now();

      setStatus("Saving event...");
      await addDoc(collection(db, "events"), {
        id: eventId,
        title,
        date,
        time,
        priority,
        requestedBy,
        link,
        image: imageURL,
        storagePath,
        createdAt: timestamp,
        createdBy: updatedBy.trim(),
        lastUpdatedAt: timestamp,
        lastUpdatedBy: updatedBy.trim()
      });

      setStatus("Sending Discord ticket...");

      const webhookURL =
        "https://discordapp.com/api/webhooks/1481530466136883263/d_J77WyQZ_lOBkzup1FeI9LbF-F_5VK-mcb02hNMMqbq-xQ5Lc-0IDW-qCTJCfv1Mjui";

      await fetch(webhookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          embeds: [
            {
              title: "New AISoc Event Submission",
              color: 5814783,
              fields: [
                { name: "Event Title", value: title },
                { name: "Date", value: date },
                { name: "Time", value: time },
                { name: "Priority", value: priority },
                { name: "Requested By", value: requestedBy },
                { name: "Submitted By", value: updatedBy.trim() },
                { name: "Event Link", value: link },
                { name: "Banner Image URL", value: imageURL }
              ]
            }
          ]
        })
      });

      setSubmitted(true);
      setStatus("Event created successfully.");
    } catch (error) {
      setStatus("Something went wrong while submitting the event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminShell
      title="Create Event"
      subtitle="Upload a new event banner and publish it to the public events carousel."
    >
      {submitted ? (
        <Box sx={{ textAlign: "center", py: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Event submitted successfully!
          </Typography>

          <Typography sx={{ mb: 4 }}>
            The Projects team has been notified on Discord and the event is now stored in Firebase.
          </Typography>

          <Button variant="contained" onClick={resetForm}>
            Submit Another Event
          </Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Event Title"
            fullWidth
            sx={{ mb: 3 }}
            value={form.title}
            onChange={handleChange("title")}
          />

          <TextField
            label="Event Date"
            type="date"
            fullWidth
            sx={{ mb: 3 }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: minDate }}
            value={form.date}
            onChange={handleChange("date")}
          />

          <TextField
            label="Event Time"
            type="time"
            fullWidth
            sx={{ mb: 3 }}
            InputLabelProps={{ shrink: true }}
            value={form.time}
            onChange={handleChange("time")}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Priority</InputLabel>

            <Select
              value={form.priority}
              label="Priority"
              onChange={handleChange("priority")}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Requested By</InputLabel>

            <Select
              value={form.requestedBy}
              label="Requested By"
              onChange={handleChange("requestedBy")}
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
            fullWidth
            sx={{ mb: 3 }}
            value={form.link}
            onChange={handleChange("link")}
          />

          <TextField
            label="Your Name"
            fullWidth
            sx={{ mb: 3 }}
            helperText="This will be stored as the creator and latest updater for transparency."
            value={form.updatedBy}
            onChange={handleChange("updatedBy")}
          />

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mb: 2 }}
          >
            Upload Banner

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp,image/avif,image/heic,image/heif"
              hidden
              onChange={(event) => setBannerFile(event.target.files?.[0] || null)}
            />
          </Button>

          <Typography sx={{ mb: 3, color: "text.secondary" }}>
            Accepted formats: PNG, JPG, JPEG, WEBP, AVIF, HEIC, HEIF. Uploads are converted to WebP automatically.
          </Typography>

          {bannerFile && (
            <Typography sx={{ mb: 2 }}>
              Selected file: {bannerFile.name}
            </Typography>
          )}

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Event"}
          </Button>

          {status && (
            <Typography sx={{ mt: 3 }}>
              {status}
            </Typography>
          )}
        </Box>
      )}
    </AdminShell>
  );
}

export default AdminDashboard;
