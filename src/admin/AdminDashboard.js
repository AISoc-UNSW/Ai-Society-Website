import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

function AdminDashboard() {
  return (
    <Box
      sx={{
        padding: "60px",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Create Event
      </Typography>

      <TextField
        fullWidth
        label="Event Title"
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        label="Event Description"
        multiline
        rows={3}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        label="Rubric Link"
        sx={{ mb: 3 }}
      />

      <Button variant="contained">
        Upload Event
      </Button>
    </Box>
  );
}

export default AdminDashboard;