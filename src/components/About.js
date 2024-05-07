import React from "react";
import { Box, Typography, Button } from "@mui/material";
import build from "../assets/build.png";

const handleClick = () => {
    window.location.href = "mailto:aisoc@unsw.edu.au";
};

const About = () => {
    return (
        <>
            <Box
                id="about"
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    padding: "5vh 5vw",
                    flexWrap: "wrap",
                    scrollSnapAlign: "center",
                    alignItems: "center",
                    backgroundColor: "#110c29",
                    color: "white",
                }}
            >
                <Box
                    sx={{
                        width: { xs: "100%", md: "55%" },
                        textAlign: "left",
                        paddingRight: { md: "30px" },
                        paddingBottom: { xs: "30px", md: 0 },
                    }}
                >
                    <Typography
                        variant="h3"
                        align="left"
                        gutterBottom={true}
                        sx={{ fontWeight: "bold", fontFamily: "Ubuntu Sans" }}
                    >
                        Empowering Minds, Advancing AI: Exploring the Frontiers
                        of Artificial Intelligence
                    </Typography>
                    <Typography
                        sx={{
                            paddingBottom: "20px",
                            color: "rgba(255, 255, 255, 0.8)",
                            fontSize: "20px",
                            fontFamily: "Ubuntu Sans",
                        }}
                    >
                        Welcome to our university society dedicated to the study
                        and application of artificial intelligence. Through
                        engaging events, workshops, and projects, we aim to
                        foster a community of AI enthusiasts and drive
                        innovation in this rapidly evolving field.
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={handleClick}
                        sx={{
                            color: "white",
                            fontWeight: "bold",
                            borderColor: "black",
                            fontFamily: "Ubuntu Sans",
                            width: "110px",
                            height: "50px",
                            fontSize: "18px",
                            backgroundColor: "rgba(111, 88, 218, 0.15)",
                            "&:hover": {
                                backgroundColor: "#28204a",
                                borderColor: "black",
                            },
                        }}
                    >
                        Contact
                    </Button>
                </Box>
                <Box
                    sx={{
                        width: { xs: "100%", md: "40%" },
                        textAlign: { xs: "center", md: "right" },
                    }}
                >
                    <img
                        src={build}
                        style={{
                            maxWidth: "600px",
                            minWidth: "30vw",
                        }}
                        alt="build"
                    />
                </Box>
            </Box>
        </>
    );
};

export default About;
