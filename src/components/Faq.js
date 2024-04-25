import React from "react";
import { Box, Typography, Button } from "@mui/material";

const handleClick = () => {
    window.location.href = "mailto:aisoc@unsw.edu.au";
};

const Faq = () => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "#f5f5f5",
                    padding: "3rem",
                    // border: "2px solid black",
                    flexWrap: "wrap",
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
                        sx={{ fontWeight: "bold" }}
                    >
                        Frequently Asked Questions
                    </Typography>
                    <Typography sx={{ marginBottom: "20px" }}>
                        Find answers to common questions about our society,
                        membership and events.
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={handleClick}
                        sx={{
                            color: "black",
                            borderColor: "black",
                            "&:hover": {
                                backgroundColor: "#B9B7BD",
                                borderColor: "black",
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
                        sx={{ fontWeight: "bold", marginBottom: "15px" }}
                    >
                        What is this society about?
                    </Typography>
                    <Typography sx={{ marginBottom: "30px" }}>
                        Our society focuses on artifical intelligence and its
                        applications in various fields. We aim to create a
                        community of AI ethusiasts and provide opportunities for
                        learning and collaboration.
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", marginBottom: "15px" }}
                    >
                        How can I join?
                    </Typography>
                    <Typography sx={{ marginBottom: "30px" }}>
                        To join our society, you can sign up through our website
                        or attend one of our events and register on the sport.
                        Membership is open to all university students.
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", marginBottom: "15px" }}
                    >
                        Are there any membership fees?
                    </Typography>
                    <Typography sx={{ marginBottom: "30px" }}>
                        No, membership to our society is completely free. We
                        believe in providing equal opportunities for all
                        students to engage with AI.
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", marginBottom: "15px" }}
                    >
                        What events do you organise?
                    </Typography>
                    <Typography sx={{ marginBottom: "30px" }}>
                        We organise a variety of events, including workshops,
                        guest lectures, hackathons, and networking sessions.
                        Check our events page for upcoming activities.
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", marginBottom: "15px" }}
                    >
                        Can I participate in events?
                    </Typography>
                    <Typography sx={{ marginBottom: "30px" }}>
                        Yes, all our events are open to society members. Simply
                        register for the events you are interested in and join
                        us for an enriching experience
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default Faq;
