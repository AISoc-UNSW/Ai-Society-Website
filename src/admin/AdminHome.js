import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AdminShell from "./AdminShell";

const actions = [
  {
    title: "Create Event",
    description: "Publish a new event with banner upload, metadata, and Discord notification.",
    to: "/admin/events/new",
    cta: "Open Form"
  },
  {
    title: "Manage Events",
    description: "Review existing events, update details, replace banners, or delete old entries.",
    to: "/admin/events",
    cta: "View Events"
  }
];

function AdminHome() {
  return (
    <AdminShell
      title="Admin Dashboard"
      subtitle="Choose a task below to manage the public events section."
    >
      <Box
        sx={{
          marginTop: 2,
          padding: { xs: 1.5, md: 3 },
          borderRadius: "18px",
          border: "1px solid rgba(15, 23, 42, 0.08)",
          backgroundColor: "#f8fafc"
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: 3
          }}
        >
          {actions.map((action) => (
            <Paper
              key={action.title}
              variant="outlined"
              sx={{
                minHeight: { xs: "220px", md: "260px" },
                padding: { xs: 2.25, md: 3 },
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "none"
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ mb: 1.5, fontSize: { xs: "1.55rem", md: "2rem" } }}>
                  {action.title}
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 3, fontSize: { xs: "1rem", md: "1.125rem" } }}>
                  {action.description}
                </Typography>
              </Box>

              <Box>
                <Button component={RouterLink} to={action.to} variant="contained">
                  {action.cta}
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </AdminShell>
  );
}

export default AdminHome;
