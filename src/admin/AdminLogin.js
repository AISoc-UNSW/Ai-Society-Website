import React, { useState } from "react";
import { auth } from "../firebase/firebaseconfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button, Box, Typography, Paper } from "@mui/material";

const allowedPattern = /^unswai\.soc\..+@gmail.com$/;

const allowedTestEmails = [
  "sinsuasti95@gmail.com"
];

function AdminLogin() {
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      // Force account selection every login
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Logged in user:", user);
      console.log("Logged in email:", user.email);

      const email = user.email.toLowerCase();

      if (
        !allowedPattern.test(email) &&
        !allowedTestEmails.includes(email)
      ) {
        await auth.signOut();

        setError(
          "This email is not authorized to access the AISoc admin dashboard."
        );

        return;
      }

      // Success → redirect to dashboard
      window.location.href = "/#/admin/dashboard";

    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111",
        padding: "20px",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: "40px",
          textAlign: "center",
          maxWidth: "420px",
          width: "100%",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h4" sx={{ mb: 3 }}>
          Admin Login
        </Typography>

        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            fontSize: "16px",
            padding: "12px 20px",
          }}
        >
          Sign in with Google
        </Button>

        {error && (
          <Typography
            sx={{
              color: "#ff6b6b",
              marginTop: "20px",
            }}
          >
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default AdminLogin;