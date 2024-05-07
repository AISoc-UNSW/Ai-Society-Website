import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Unova from "../assets/unova.png";
import Footer from "./Footer";

const handleClick = () => {
    window.location.href = "mailto:aisoc@unsw.edu.au";
};

const Sponsor = () => {
    return (
        <>
            <Box
                id="sponsor"
                sx={{
                    textAlign: "center",
                    margin: "60px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    scrollSnapAlign: "start",
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
                        color: "black",
                        borderColor: "black",
                        justifyContent: "center",
                        "&:hover": {
                            backgroundColor: "#B9B7BD",
                            borderColor: "black",
                        },
                    }}
                >
                    Sponsor Us
                </Button>
            </Box>
            <Footer />
        </>
    );
};

export default Sponsor;
