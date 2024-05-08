import React from "react";
import { Box, Typography } from "@mui/material";
import Logo from "../assets/aisoc-logo.webp";
import SocialMediaIcons from "../util/Icons";

const Footer = () => {
    return (
        <Box
            sx={{
                padding: "10px 30px",
                backgroundColor: "#100b28",
            }}
        >
            <Box sx={{ textAlign: "left", color: "white" }}>
                <img src={Logo} style={{ width: "200px" }} alt="logo" />
                <Box sx={{ padding: "0 38px" }}>
                    <Typography sx={{ fontFamily: "Ubuntu Sans" }}>
                        The AI Society of UNSW
                    </Typography>
                    <SocialMediaIcons />
                    <Typography
                        sx={{
                            fontFamily: "Ubuntu Sans",
                            paddingTop: "10px",
                            borderTop: "2px solid silver",
                        }}
                    >
                        © 2024 — AISoc UNSW
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
