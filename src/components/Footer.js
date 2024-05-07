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
                    link="https://www.instagram.com/unswai.soc/"
                />
                <IconWithHover
                    icon={<Facebook sx={{ fontSize: 35 }} />}
                    link="https://www.facebook.com/profile.php?id=100092595608038"
                />
                <IconWithHover
                    icon={<GitHub sx={{ fontSize: 35 }} />}
                    link="https://github.com/AISoc-UNSW"
                />
                <IconWithHover
                    icon={<LinkedIn sx={{ fontSize: 35 }} />}
                    link="https://www.linkedin.com/company/unsw-artificial-intelligence-society/"
                />
                <IconWithHover
                    icon={
                        <DiscordIcon
                            style={{ width: "35px", height: "35px" }}
                        />
                    }
                    link="https://discord.gg/gpahrBHB"
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
                    <Typography sx={{ fontFamily: "Ubuntu Sans" }}>
                        © 2024 — AISoc UNSW
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
