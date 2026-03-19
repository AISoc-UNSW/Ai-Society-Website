import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Card, CardMedia, CardContent, IconButton, Alert, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5008";

const AdminDashboard = () => {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ title: "", photo: "", description: "", link: "" });
  const [submitMsg, setSubmitMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchEvents = () => {
    setLoading(true);
    fetch(`${API_BASE}/api/events`)
      .then((r) => r.json())
      .then((data) => { setEvents(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { if (authed) fetchEvents(); }, [authed]);

  const handleAuth = () => {
    if (!password.trim()) return;
    // We verify by attempting a dummy POST — if it comes back 401, password is wrong
    fetch(`${API_BASE}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminPassword: password, title: "_check_", photo: "_", link: "_" }),
    }).then((r) => {
      // 400 = right password, bad data. 401 = wrong password.
      if (r.status === 401) {
        setAuthError("Incorrect password.");
      } else {
        setAuthed(true);
        setAuthError("");
      }
    }).catch(() => setAuthError("Could not reach server."));
  };

  const handleAdd = () => {
    const { title, photo, link } = form;
    if (!title || !photo || !link) {
      setSubmitMsg({ type: "error", text: "Title, photo URL, and link are required." });
      return;
    }
    setSubmitting(true);
    fetch(`${API_BASE}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminPassword: password, ...form }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setSubmitMsg({ type: "success", text: "Event added!" });
        setForm({ title: "", photo: "", description: "", link: "" });
        fetchEvents();
      })
      .catch((e) => setSubmitMsg({ type: "error", text: e.message }))
      .finally(() => setSubmitting(false));
  };

  const handleDelete = (id) => {
    fetch(`${API_BASE}/api/events/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminPassword: password }),
    }).then(() => fetchEvents());
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": { color: "white", "& fieldset": { borderColor: "rgba(255,255,255,0.4)" }, "&:hover fieldset": { borderColor: "white" } },
    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)" },
    mb: 2,
  };

  if (!authed) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: "#110c29", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ width: 340, textAlign: "center" }}>
          <Typography variant="h5" sx={{ color: "white", fontFamily: "Ubuntu Sans", mb: 3, fontWeight: "bold" }}>
            Admin Login
          </Typography>
          <TextField
            fullWidth label="Password" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAuth()}
            sx={fieldSx}
          />
          {authError && <Alert severity="error" sx={{ mb: 2 }}>{authError}</Alert>}
          <Button fullWidth variant="outlined" onClick={handleAuth}
            sx={{ color: "white", borderColor: "white", fontFamily: "Ubuntu Sans", "&:hover": { backgroundColor: "#1d1740" } }}>
            Login
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#110c29", padding: "5% 10%", color: "white" }}>
      <Typography variant="h4" sx={{ fontFamily: "Ubuntu Sans", fontWeight: "bold", mb: 4 }}>
        Events Dashboard
      </Typography>

      {/* Add Event Form */}
      <Box sx={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 2, p: 3, mb: 5 }}>
        <Typography variant="h6" sx={{ fontFamily: "Ubuntu Sans", mb: 2 }}>Add New Event</Typography>
        <TextField fullWidth label="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} sx={fieldSx} />
        <TextField fullWidth label="Photo URL *" value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} sx={fieldSx} />
        <TextField fullWidth label="Description (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} sx={fieldSx} />
        <TextField fullWidth label="Link *" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} sx={fieldSx} />
        {submitMsg && <Alert severity={submitMsg.type} sx={{ mb: 2 }}>{submitMsg.text}</Alert>}
        <Button variant="outlined" onClick={handleAdd} disabled={submitting}
          sx={{ color: "white", borderColor: "white", fontFamily: "Ubuntu Sans", "&:hover": { backgroundColor: "#1d1740" } }}>
          {submitting ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Add Event"}
        </Button>
      </Box>

      {/* Existing Events */}
      <Typography variant="h6" sx={{ fontFamily: "Ubuntu Sans", mb: 2 }}>Current Events</Typography>
      {loading ? (
        <CircularProgress sx={{ color: "white" }} />
      ) : events.length === 0 ? (
        <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>No events yet.</Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {events.map((event) => (
            <Card key={event._id} sx={{ width: 280, backgroundColor: "#1d1740", color: "white", position: "relative" }}>
              <CardMedia component="img" height="160" image={event.photo} alt={event.title} sx={{ objectFit: "cover" }} />
              <CardContent>
                <Typography sx={{ fontFamily: "Ubuntu Sans", fontWeight: "bold" }}>{event.title}</Typography>
                {event.description && (
                  <Typography sx={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", mt: 0.5 }}>{event.description}</Typography>
                )}
                <Typography sx={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", mt: 0.5, wordBreak: "break-all" }}>{event.link}</Typography>
              </CardContent>
              <IconButton onClick={() => handleDelete(event._id)}
                sx={{ position: "absolute", top: 8, right: 8, backgroundColor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { backgroundColor: "red" } }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AdminDashboard;