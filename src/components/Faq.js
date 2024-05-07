import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Reveal from "../util/Reveal";

const handleClick = () => {
    window.location.href = "mailto:aisoc@unsw.edu.au";
};

const Faq = () => {
    return (
        <>
            <Box
                id="faq"
                sx={{
                    backgroundColor: "#1a1134",
                    color: "white",
                }}
            >
                <Reveal>
                    <Box
                        id="faq"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            backgroundColor: "#1a1134",
                            color: "white",
                            padding: "3rem",
                        }}
                    >
                        <Box
                            sx={{
                                flex: 4.5,
                                textAlign: "left",
                                marginRight: "30px",
                                marginBottom: "30px",

                                // minWidth: "400px",
                            }}
                        >
                            <Typography
                                variant="h3"
                                align="left"
                                gutterBottom={true}
                                sx={{
                                    fontWeight: "bold",
                                    fontFamily: "Ubuntu Sans",
                                }}
                            >
                                Frequently Asked Questions
                            </Typography>
                            <Typography
                                sx={{
                                    marginBottom: "20px",
                                    fontFamily: "Ubuntu Sans",
                                    color: "rgba(255, 255, 255, 0.8)",
                                }}
                            >
                                Find answers to common questions about our
                                society, membership and events.
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={handleClick}
                                sx={{
                                    color: "white",
                                    fontWeight: "bold",
                                    borderColor: "white",
                                    fontFamily: "Ubuntu Sans",
                                    fontSize: "18px",
                                    "&:hover": {
                                        backgroundColor: "#1d1740",
                                        borderColor: "white",
                                    },
                                }}
                            >
                                Contact
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                flex: 5.5,
                                textAlign: "left",
                                minWidth: "60vw",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    marginBottom: "15px",
                                    fontFamily: "Ubuntu Sans",
                                }}
                            >
                                What is this society about?
                            </Typography>
                            <Typography
                                sx={{
                                    marginBottom: "30px",
                                    fontFamily: "Ubuntu Sans",
                                    color: "rgba(255, 255, 255, 0.8)",
                                }}
                            >
                                Our society focuses on artifical intelligence
                                and its applications in various fields. We aim
                                to create a community of AI ethusiasts and
                                provide opportunities for learning and
                                collaboration.
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    marginBottom: "15px",
                                    fontFamily: "Ubuntu Sans",
                                }}
                            >
                                How can I join?
                            </Typography>
                            <Typography
                                sx={{
                                    marginBottom: "30px",
                                    fontFamily: "Ubuntu Sans",
                                    color: "rgba(255, 255, 255, 0.8)",
                                }}
                            >
                                To join our society, you can sign up through our
                                website or attend one of our events and register
                                on the sport. Membership is open to all
                                university students.
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    marginBottom: "15px",
                                    fontFamily: "Ubuntu Sans",
                                }}
                            >
                                Are there any membership fees?
                            </Typography>
                            <Typography
                                sx={{
                                    marginBottom: "30px",
                                    fontFamily: "Ubuntu Sans",
                                    color: "rgba(255, 255, 255, 0.8)",
                                }}
                            >
                                No, membership to our society is completely
                                free. We believe in providing equal
                                opportunities for all students to engage with
                                AI.
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    marginBottom: "15px",
                                    fontFamily: "Ubuntu Sans",
                                }}
                            >
                                What events do you organise?
                            </Typography>
                            <Typography
                                sx={{
                                    marginBottom: "30px",
                                    fontFamily: "Ubuntu Sans",
                                    color: "rgba(255, 255, 255, 0.8)",
                                }}
                            >
                                We organise a variety of events, including
                                workshops, guest lectures, hackathons, and
                                networking sessions. Check our events page for
                                upcoming activities.
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    marginBottom: "15px",
                                    fontFamily: "Ubuntu Sans",
                                }}
                            >
                                Can I participate in events?
                            </Typography>
                            <Typography
                                sx={{
                                    marginBottom: "30px",
                                    fontFamily: "Ubuntu Sans",
                                    color: "rgba(255, 255, 255, 0.8)",
                                }}
                            >
                                Yes, all our events are open to society members.
                                Simply register for the events you are
                                interested in and join us for an enriching
                                experience
                            </Typography>
                        </Box>
                    </Box>
                </Reveal>
            </Box>
        </>
    );
};

export default Faq;
