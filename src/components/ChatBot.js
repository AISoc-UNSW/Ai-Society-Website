import React from "react";
import { Typography } from "@mui/material";

const Chatbot = () => {
    const chatbotURL = "https://ai-soc.openonion.ai"; // Your chatbot's URL

    const containerStyle = {
        height: "70vh", // 80% of the viewport height
        border: "1px solid #ccc", // Light grey border
        borderRadius: "15px", // Rounded corners
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Subtle shadow for depth
        margin: "0", // Vertically center and auto horizontal margin
        padding: 0, // No padding inside the container
        overflow: "hidden", // Hide scrollbars that may appear
        position: "relative", // Needed for proper positioning
    };

    // Styles for the iframe to fit well within the container
    const iframeStyle = {
        width: "100%", // Take full width of the container
        height: "100%", // Take full height of the container
        border: "none", // No border for the iframe
    };

    return (
        <div
            style={{
                backgroundColor: "#0e092d",
                padding: "5vh 5vw",
                color: "white",
                textAlign: "center",
            }}
            id="chatbot"
        >
            <Typography
                sx={{
                    fontWeight: "bold",
                    margin: "15px 0",
                    fontFamily: "Ubuntu Sans",
                }}
                variant="h3"
            >
                ChatBot
            </Typography>
            <Typography
                sx={{
                    marginBottom: "40px",
                    fontFamily: "Ubuntu Sans",
                    color: "rgba(255, 255, 255, 0.8)",
                }}
            >
                Ask it anything about UNSW
            </Typography>
            <div style={containerStyle}>
                <iframe src={chatbotURL} title="Chatbot" style={iframeStyle} />
            </div>
        </div>
    );
};

export default Chatbot;
