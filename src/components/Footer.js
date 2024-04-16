import React from "react";
import { Box, Typography } from "@mui/material";
import Logo from "../assets/aisoc-logo.png";
import { Facebook, Instagram, GitHub, LinkedIn } from "@mui/icons-material";
import { ReactComponent as DiscordIcon } from "../assets/discord-icon.svg";
const Footer = () => {
    const SocialMediaIcons = () => {
        return (
            <Box
                sx={{
                    display: "flex",
                    marginBottom: "10px",
                    borderBottom: "2px solid silver",
                    paddingBottom: "10px",
                }}
            >
                <IconWithHover
                    icon={<Instagram sx={{ fontSize: 35 }} />}
                    link="https://www.instagram.com"
                />
                <IconWithHover
                    icon={<Facebook sx={{ fontSize: 35 }} />}
                    link="https://www.facebook.com"
                />
                <IconWithHover
                    icon={<GitHub sx={{ fontSize: 35 }} />}
                    link="https://github.com"
                />
                <IconWithHover
                    icon={<LinkedIn sx={{ fontSize: 35 }} />}
                    link="https://www.linkedin.com"
                />
                <IconWithHover
                    icon={
                        <DiscordIcon
                            style={{ width: "35px", height: "35px" }}
                        />
                    }
                    link="https://discord.com"
                />
            </Box>
        );
    };

    const IconWithHover = ({ icon, link }) => {
        return (
            <Box
                sx={{
                    marginRight: "5px", // Add some margin between icons
                    transition: "transform 0.2s", // Add transition for smooth hover effect
                    "&:hover": {
                        transform: "scale(1.2)", // Enlarge the icon by 20% on hover
                        cursor: "pointer",
                    },
                }}
                onClick={() => window.open(link, "_blank")}
            >
                {icon}
            </Box>
        );
    };
    return (
        <Box
            sx={{
                padding: "10px 30px",
                borderTop: "1px solid silver",
                backgroundColor: "black",
            }}
        >
            <Box sx={{ textAlign: "left", color: "white" }}>
                <img src={Logo} style={{ width: "200px" }} alt="logo" />
                <Box sx={{ padding: "0 38px" }}>
                    <Typography>The AI Society of UNSW</Typography>
                    <SocialMediaIcons />
                    <Typography>© 2024 — AISoc UNSW</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
