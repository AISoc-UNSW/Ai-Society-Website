import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-scroll";
import Logo from "../assets/logo.png";
import { Facebook, Instagram, GitHub, LinkedIn } from "@mui/icons-material";
import { ReactComponent as DiscordIcon } from "../assets/discord-icon.svg";

const NavBar = () => {
    const SocialMediaIcons = () => {
        return (
            <Box
                sx={{ display: "flex", justifyContent: "center", mt: 2, pb: 1 }}
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
            </Box>
        );
    };

    const IconWithHover = ({ icon, link }) => {
        return (
            <Box
                sx={{
                    margin: "0 10px", // Add some margin between icons
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
        <AppBar
            position="sticky"
            sx={{ backgroundColor: "#261147", marginTop: "-64px" }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={Logo} style={{ width: 50, marginRight: 10 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 4,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        AISOC
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexGrow: 1,
                        // justifyContent: "space-evenly",
                        "& > button": {
                            fontWeight: 700,
                            position: "relative",
                            paddingBottom: "0.2rem", // Add some padding at the bottom of the button
                            "&:hover": {
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    left: 0,
                                    bottom: 0, // Position the underline at the bottom of the text
                                    width: "100%",
                                    height: 2,
                                    backgroundColor: "white",
                                    transform: "scaleX(1)",
                                    transformOrigin: "left", // Set the transform origin to the left
                                    transition: "transform 0.3s ease-in-out",
                                },
                            },
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                left: 0,
                                bottom: 0, // Position the underline at the bottom of the text
                                width: "100%",
                                height: 2,
                                backgroundColor: "white",
                                transform: "scaleX(0)",
                                transformOrigin: "left", // Set the transform origin to the left
                                transition: "transform 0.3s ease-in-out",
                            },
                        },
                    }}
                >
                    <Button color="inherit">
                        <Link
                            activeClass="active"
                            to="section1"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            ABOUT
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link
                            activeClass="active"
                            to="section2"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            EVENTS
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link
                            activeClass="active"
                            to="section2"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            CONTACT
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link
                            activeClass="active"
                            to="section2"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            SPONSOR
                        </Link>
                    </Button>
                </Box>
                <Box>
                    <SocialMediaIcons />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
