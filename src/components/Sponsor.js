import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Unova from "../assets/unova.webp";
import bg from "../assets/purple-bg.webp";
import Footer from "./Footer";
import Reveal from "../util/Reveal";

const handleClick = () => {
    window.location.href = "mailto:aisoc@unsw.edu.au";
};

const Sponsor = () => {
    return (
        <>
            <Box
                id="sponsor"
                sx={{
                    padding: "5vh 0",
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    color: "white",
                }}
            >
                <Reveal>
                    <Box
                        id="sponsor"
                        sx={{
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                marginBottom: "15px",
                                fontFamily: "Ubuntu Sans",
                            }}
                        >
                            Proudly Sponsored by
                        </Typography>
                        <img
                            src={Unova}
                            style={{
                                width: "500px",
                                maxWidth: "90vw",
                                height: "auto",
                                marginBottom: "20px",
                            }}
                            alt="Unova"
                        />
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
                            Sponsor Us
                        </Button>
                    </Box>
                </Reveal>
            </Box>
            <Footer />
        </>
    );
};

export default Sponsor;
