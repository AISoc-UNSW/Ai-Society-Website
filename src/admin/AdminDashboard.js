import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";

import { signOut } from "firebase/auth";
import { auth, storage, db } from "../firebase/firebaseconfig";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

import {
  addDoc,
  collection
} from "firebase/firestore";

function AdminDashboard() {

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [link, setLink] = useState("");
  const [bannerFile, setBannerFile] = useState(null);
  const [priority, setPriority] = useState("");
  const [requestedBy, setRequestedBy] = useState("");

  const [status, setStatus] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!title || !date || !time || !link || !bannerFile || !priority || !requestedBy) {
      setStatus("Please fill in all required fields.");
      return;
    }

    if (bannerFile.type !== "image/webp") {
      setStatus("Banner must be a .webp file.");
      return;
    }

    const eventDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    if (eventDateTime < now) {
      setStatus("Cannot submit an event in the past.");
      return;
    }

    if (!isValidURL(link)) {
      setStatus("Event link must be a valid URL.");
      return;
    }

    try {

      setStatus("Uploading banner...");

      const eventId = `event_${Date.now()}`;

      const bannerRef = ref(storage, `event-banners/${eventId}.webp`);

      await uploadBytes(bannerRef, bannerFile);

      const imageURL = await getDownloadURL(bannerRef);

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
        createdAt: Date.now()
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
                { name: "Event Link", value: link },
                { name: "Banner Image URL", value: imageURL }
              ]
            }
          ]
        })
      });

      setSubmitted(true);

    } catch (error) {

      console.error(error);

      setStatus("Something went wrong while submitting the event.");

    }

  };

  const handleNewEvent = () => {

    setSubmitted(false);
    setStatus("");

    setTitle("");
    setDate("");
    setTime("");
    setLink("");
    setBannerFile(null);
    setPriority("");
    setRequestedBy("");

  };

  const handleLogout = async () => {

    try {

      await signOut(auth);

      window.location.href = "/";

    } catch (err) {

      console.error("Logout failed:", err);

    }

  };

  return (

    <Box
      sx={{
        padding: "60px",
        display: "flex",
        justifyContent: "center"
      }}
    >

      <Paper
        elevation={6}
        sx={{
          padding: "40px",
          maxWidth: "600px",
          width: "100%"
        }}
      >

        {submitted ? (

          <Box sx={{ textAlign: "center" }}>

            <Typography variant="h5" sx={{ mb: 3 }}>
              Event submitted successfully!
            </Typography>

            <Typography sx={{ mb: 4 }}>
              The Projects team has been notified on Discord.
              The event banner should appear on the website shortly.
            </Typography>

            <Button
              variant="contained"
              sx={{ mr: 2 }}
              onClick={handleNewEvent}
            >
              Submit Another Event
            </Button>

            <Button
              variant="outlined"
              onClick={handleLogout}
            >
              Log Out
            </Button>

          </Box>

        ) : (

          <>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2
              }}
            >

              <Typography variant="h4">
                Create Event
              </Typography>

              <Button
                variant="outlined"
                size="small"
                onClick={handleLogout}
              >
                Log Out
              </Button>

            </Box>

            <Typography
              variant="body1"
              sx={{ mb: 4, color: "text.secondary" }}
            >
              Provide details for the next AISoc event below.
            </Typography>

            <form onSubmit={handleSubmit}>

              <TextField
                label="Event Title"
                fullWidth
                sx={{ mb: 3 }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <TextField
                label="Event Date"
                type="date"
                fullWidth
                sx={{ mb: 3 }}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: new Date().toISOString().split("T")[0]
                }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <TextField
                label="Event Time"
                type="time"
                fullWidth
                sx={{ mb: 3 }}
                InputLabelProps={{ shrink: true }}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Priority</InputLabel>

                <Select
                  value={priority}
                  label="Priority"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>

              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Requested By</InputLabel>

                <Select
                  value={requestedBy}
                  label="Requested By"
                  onChange={(e) => setRequestedBy(e.target.value)}
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
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />

              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mb: 2 }}
              >
                Upload Banner (.webp only)

                <input
                  type="file"
                  accept=".webp"
                  hidden
                  onChange={(e) => setBannerFile(e.target.files[0])}
                />

              </Button>

              {bannerFile && (
                <Typography sx={{ mb: 2 }}>
                  Selected file: {bannerFile.name}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
              >
                Submit Event
              </Button>

            </form>

            {status && (
              <Typography sx={{ mt: 3 }}>
                {status}
              </Typography>
            )}

          </>

        )}

      </Paper>

    </Box>

  );

}

export default AdminDashboard;