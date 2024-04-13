import React from "react";
import { Box } from "@mui/material";
import Brain from "./Brain";
import landing from "../assets/Hero-Image.png";

const Landing = () => {
    return (
        <Box
            sx={{
                height: "100vh",
                // width: "100vw",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column", // Align items vertically
                alignItems: "center",
                justifyContent: "center",
                color: "red", // Text color
                fontFamily: "sans-serif",
                fontSize: "3rem",
                fontWeight: "bold",
            }}
        >
            <Brain />
        </Box>
    );
};

export default Landing;
