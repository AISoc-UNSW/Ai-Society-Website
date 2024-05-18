import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

const Chatbot = () => {
    const [show, setShow] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
    const [visible, setVisible] = useState(false);
    const chatbotRef = useRef(null);
    const chatbotURL = "https://ai-soc.openonion.ai"; // Your chatbot's URL

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
            @keyframes slideIn {
                from {
                    transform: scale(0.9);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: scale(1);
                    opacity: 1;
                }
                to {
                    transform: scale(0.9);
                    opacity: 0;
                }
            }

            .chatbot-container.show {
                animation: slideIn 0.3s ease-in-out forwards;
            }

            .chatbot-container.hide {
                animation: slideOut 0.3s ease-in-out forwards;
            }
        `;
        document.head.appendChild(styleSheet);
    }, []);

    const containerStyle = {
        display: show ? "block" : "none",
        position: "fixed",
        bottom: isMobile ? "70px" : "80px",
        right: isMobile ? "10px" : "20px",
        width: isMobile ? "92vw" : "75vw",
        height: isMobile ? "80vh" : "75vh",
        border: "1px solid #ccc",
        borderRadius: isMobile ? "10px" : "15px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
        zIndex: 1001,
        backgroundColor: "white",
        transition: "all 0.3s ease-in-out",
        opacity: show ? 1 : 0,
    };

    const iframeStyle = {
        width: "100%",
        height: "100%",
        border: "none",
    };

    const buttonStyle = {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1002, // Ensure button is above the chatbot window
        backgroundColor: "#6a0dad", // Rich purple color
        color: "white", // Adjust button text color
        borderRadius: "20px", // Round button corners
        padding: "10px 20px", // Adjust button padding
        textTransform: "none", // Keep button text case
        opacity: visible ? 1 : 0, // Ensure button is fully visible
        transition: "opacity 0.5s ease-in-out", // Fade-in effect
    };

    const overlayStyle = {
        display: show ? "block" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
    };

    return (
        <div>
            <Button
                style={buttonStyle}
                variant="contained"
                disabled={!visible}
                onClick={() => setShow((prevShow) => !prevShow)}
                startIcon={show ? <CloseIcon /> : <ChatIcon />}
            >
                {show ? "Close Chatbot" : "Chatbot"}
            </Button>
            <div style={overlayStyle} onClick={() => setShow(false)} />
            <div
                style={containerStyle}
                className={`chatbot-container ${show ? "show" : "hide"}`}
                ref={chatbotRef}
            >
                <iframe src={chatbotURL} title="Chatbot" style={iframeStyle} />
            </div>
        </div>
    );
};

export default Chatbot;
