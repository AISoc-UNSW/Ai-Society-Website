import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Reveal from "../util/Reveal";
import build from "../assets/build.png";

const About = () => {
    return (
        <Box
            id="about"
            sx={{
                display: "flex",
                flexDirection: "row",
                padding: "3rem",
                flexWrap: "wrap",
                marginTop: "20px",
            }}
        >
            <Box
                sx={{
                    flex: 7,
                    textAlign: "left",
                    marginRight: "30px",
                    marginBottom: "30px",
                    minWidth: "300px",
                }}
            >
                <Reveal>
                    <Typography
                        variant="h3"
                        align="left"
                        gutterBottom="true"
                        sx={{ fontWeight: "bold" }}
                    >
                        Empowering Minds, Advancing AI: Exploring the Frontiers
                        of Artificial Intelligence
                    </Typography>
                </Reveal>
                <Reveal>
                    <Typography sx={{ marginBottom: "20px" }}>
                        Welcome to our university society dedicated to the study
                        and application of artificial intelligence. Through
                        engaging events, workshops, and projects, we aim to
                        foster a community of AI enthusiasts and drive
                        innovation in this rapidly evolving field.
                    </Typography>
                </Reveal>
                <Reveal>
                    <Button
                        variant="outlined"
                        href="#outlined-buttons"
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
                </Reveal>
            </Box>
            <Box
                sx={{
                    flex: 3,
                    textAlign: "left",
                }}
            >
                <Reveal>
                    <img
                        src={build}
                        style={{
                            width: "25vw",
                            maxWidth: "80vw",
                        }}
                        alt="build"
                    />
                </Reveal>
            </Box>
        </Box>
    );
};

export default About;