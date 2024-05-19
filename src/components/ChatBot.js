import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

const Chatbot = () => {
    const [show, setShow] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
    const [visible, setVisible] = useState(false);
    const [animateOut, setAnimateOut] = useState(false);
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
            @keyframes riseIn {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @keyframes fallOut {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(100%);
                    opacity: 0;
                }
            }

            .chatbot-container.show {
                animation: riseIn 0.3s ease-in-out forwards;
            }

            .chatbot-container.hide {
                animation: fallOut 0.3s ease-in-out forwards;
            }

            @keyframes riseButton {
                from {
                    transform: translateY(100%) translateX(-50%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0) translateX(-50%);
                    opacity: 1;
                }
            }

            @keyframes fallButton {
                from {
                    transform: translateY(0) translateX(-50%);
                    opacity: 1;
                }
                to {
                    transform: translateY(100%) translateX(-50%);
                    opacity: 0;
                }
            }

            .chatbot-button.show {
                animation: riseButton 0.5s ease-in-out forwards;
            }

            .chatbot-button.hide {
                animation: fallButton 0.5s ease-in-out forwards;
            }
        `;
        document.head.appendChild(styleSheet);
    }, []);

    useEffect(() => {
        if (!show && animateOut) {
            const timer = setTimeout(() => {
                setAnimateOut(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [show, animateOut]);

    const handleClick = () => {
        if (show) {
            setAnimateOut(true);
            setTimeout(() => {
                setShow(false);
            }, 300);
        } else {
            setShow(true);
        }
    };

    const containerStyle = {
        display: show || animateOut ? "block" : "none",
        position: "fixed",
        bottom: isMobile ? "70px" : "80px",
        left: "50%",
        marginLeft: isMobile ? "-46vw" : "-37.5vw",
        width: isMobile ? "92vw" : "75vw",
        height: isMobile ? "80vh" : "75vh",
        border: "1px solid #ccc",
        borderRadius: isMobile ? "10px" : "15px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
        zIndex: 1001,
        backgroundColor: "white",
        opacity: show || animateOut ? 1 : 0,
    };

    const iframeStyle = {
        width: "100%",
        height: "100%",
        border: "none",
    };

    const buttonStyle = {
        position: "fixed",
        bottom: "20px",
        left: "50%",
        zIndex: 1002,
        backgroundColor: "#6a0dad",
        color: "white",
        borderRadius: "20px",
        padding: "10px 20px",
        textTransform: "none",
    };

    const overlayStyle = {
        display: show || animateOut ? "block" : "none",
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
                className={`chatbot-button ${visible ? "show" : "hide"}`}
                style={buttonStyle}
                variant="contained"
                onClick={handleClick}
                startIcon={show ? <CloseIcon /> : <ChatIcon />}
            >
                {show ? "Close Chatbot" : "Chatbot"}
            </Button>
            <div style={overlayStyle} onClick={handleClick} />
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
