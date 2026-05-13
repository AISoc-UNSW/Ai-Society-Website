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
    window.location.href = "/";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#111",
        padding: { xs: "14px", md: "40px" },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: { xs: "18px", md: "32px" },
          borderRadius: { xs: "12px", md: "16px" },
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
            <Typography
              variant="h4"
              sx={{
                mb: 1,
                fontSize: { xs: "2.1rem", md: "2.5rem" }
              }}
            >
              {title}
            </Typography>

            {subtitle && (
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: { xs: "1rem", md: "1.125rem" }
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          <Stack
            direction="row"
            spacing={1.5}
            useFlexGap
            flexWrap="wrap"
            sx={{
              width: { xs: "100%", md: "auto" }
            }}
          >
            <Button
              component={RouterLink}
              to="/admin/dashboard"
              variant="outlined"
              sx={{ flex: { xs: "1 1 calc(50% - 6px)", md: "0 0 auto" } }}
            >
              Dashboard
            </Button>

            <Button
              component={RouterLink}
              to="/admin/events/new"
              variant="outlined"
              sx={{ flex: { xs: "1 1 calc(50% - 6px)", md: "0 0 auto" } }}
            >
              Create Event
            </Button>

            <Button
              component={RouterLink}
              to="/admin/events"
              variant="outlined"
              sx={{ flex: { xs: "1 1 calc(50% - 6px)", md: "0 0 auto" } }}
            >
              Manage Events
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{ flex: { xs: "1 1 calc(50% - 6px)", md: "0 0 auto" } }}
            >
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
