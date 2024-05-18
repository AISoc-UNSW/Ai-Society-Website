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
                    flexDirection: "row",
                    padding: "3rem",
                    flexWrap: "wrap",
                    // marginTop: "8vh",
                    // marginBottom: "10vh",
                    margin: "10vh 10vw",
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
                    <Typography
                        variant="h3"
                        align="left"
                        gutterBottom={true}
                        sx={{ fontWeight: "bold" }}
                    >
                        Empowering Minds, Advancing AI: Exploring the Frontiers
                        of Artificial Intelligence
                    </Typography>

                    <Typography sx={{ marginBottom: "20px" }}>
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
                        flex: 3,
                        textAlign: "left",
                    }}
                >
                    <img
                        src={build}
                        style={{
                            width: "25vw",
                            maxWidth: "80vw",
                        }}
                        alt="build"
                    />
                </Box>
            </Box>
        </>
    );
};

export default About;