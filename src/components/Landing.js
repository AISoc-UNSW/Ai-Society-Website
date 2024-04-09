import React from "react";
import { Box } from "@mui/material";
// import landing from "../assets/Hero-Image.png";

const Landing = () => {
    return (
        <Box
            sx={{
                height: "100vh",
                // width: "100vw",
                // backgroundImage: `url(${landing})`,
                // backgroundSize: "cover",
                // backgroundPosition: "center",
                backgroundImage: "linear-gradient(to bottom, purple, blue)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff", // Text color
                fontFamily: "sans-serif",
                fontSize: "3rem",
                fontWeight: "bold",
            }}
        >
            LANDING PAGE WAITING ROOM
        </Box>
    );
};

export default Landing;
