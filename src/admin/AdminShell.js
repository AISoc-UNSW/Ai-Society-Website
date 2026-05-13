import React from "react";
import { Box, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { Link as RouterLink, Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase/firebaseconfig";
import { useAdminAuth } from "./adminUtils";

function AdminShell({ title, subtitle, children }) {
  const { isLoading, isAuthorized } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/#/admin";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#111",
        padding: { xs: "24px", md: "40px" },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: { xs: "24px", md: "32px" },
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography variant="h4" sx={{ mb: 1 }}>
              {title}
            </Typography>

            {subtitle && (
              <Typography color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>

          <Stack direction="row" spacing={1.5} flexWrap="wrap">
            <Button component={RouterLink} to="/admin/dashboard" variant="outlined">
              Dashboard
            </Button>

            <Button component={RouterLink} to="/admin/events/new" variant="outlined">
              Create Event
            </Button>

            <Button component={RouterLink} to="/admin/events" variant="outlined">
              Manage Events
            </Button>

            <Button variant="contained" color="error" onClick={handleLogout}>
              Log Out
            </Button>
          </Stack>
        </Stack>

        <Box
          sx={{
            width: "100%",
            paddingBottom: 1
          }}
        >
          {children}
        </Box>
      </Paper>
    </Box>
  );
}

export default AdminShell;
