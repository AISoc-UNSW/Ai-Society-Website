import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseconfig";

function AdminDashboard() {

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [link, setLink] = useState("");
  const [imageURL, setImageURL] = useState("");
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

    if (!title || !date || !time || !link || !imageURL || !priority || !requestedBy) {
      setStatus("Please fill in all required fields.");
      return;
    }

    const eventDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    if (eventDateTime < now) {
      setStatus("Cannot submit an event in the past.");
      return;
    }

    if (!isValidURL(link)) {
      setStatus("Rubric link must be a valid URL.");
      return;
    }

    if (!isValidURL(imageURL)) {
      setStatus("Banner image must be a valid URL.");
      return;
    }

    setStatus("Submitting event...");

    try {

      const webhookURL = "https://discordapp.com/api/webhooks/1481530466136883263/d_J77WyQZ_lOBkzup1FeI9LbF-F_5VK-mcb02hNMMqbq-xQ5Lc-0IDW-qCTJCfv1Mjui";

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
                { name: "Rubric Link", value: link },
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
    setImageURL("");
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
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: "40px",
          maxWidth: "600px",
          width: "100%",
        }}
      >

        {submitted ? (

          <Box sx={{ textAlign: "center" }}>

            <Typography variant="h5" sx={{ mb: 3 }}>
              Event submitted successfully!
            </Typography>

            <Typography sx={{ mb: 4 }}>
              The Projects team has been notified on Discord.
              Expect the event to appear on the website within 1–2 days.
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
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
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
              <br />
              The information you provide will be sent to the Projects team as a ticket to update the website and event banner.
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
                label="Rubric Event Link"
                fullWidth
                sx={{ mb: 3 }}
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />

              <TextField
                label="Banner Image URL (Google Drive)"
                fullWidth
                sx={{ mb: 3 }}
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
              />

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