import { React, useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Hidden,
    IconButton,
    Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-scroll";
import Logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "transparent",
        height: 120, // Initial height
    },
    shrink: {
        height: 64, // Shrunk height
    },
}));

const NavBar = ({ currentIndex, setCurrentIndex, total }) => {
    const classes = useStyles();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        // Update the isScrolled based on currentIndex
        setIsScrolled(currentIndex !== 0);
    }, [currentIndex]);

    const handleNavigation = (index) => {
        setCurrentIndex(index);
        if (isMenuOpen) toggleMenu();
    };

    return (
        <AppBar
            sx={{
                transition:
                    "height 1s ease, background-color 1s ease, padding-top 1s ease",
                backgroundColor: isScrolled ? "#1F1F23" : "transparent",
                opacity: isScrolled ? 0.95 : 1,
                paddingTop: isScrolled ? "" : "3vh",
                boxShadow: "none",
                zIndex: 500,
            }}
            position="sticky"
            className={`${classes.root} ${isScrolled ? classes.shrink : ""}`}
        >
            <Toolbar sx={{ minHeight: "64px" }}>
                <a
                    href="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: "2.5vw",
                        }}
                    >
                        <img
                            src={Logo}
                            style={{ width: 50, marginRight: 10 }}
                            alt="logo"
                        />

                        <Typography
                            variant="h6"
                            noWrap
                            component="span" // Change from "a" to "span" to prevent nested anchor elements
                            sx={{
                                mr: 4,
                                display: { display: "flex" },
                                fontFamily: "monospace",
                                marginRight: "6px",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            AISOC
                        </Typography>
                    </Box>
                </a>
                <Hidden mdUp>
                    {/* Mobile Menu Button */}
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        sx={{ ml: "auto", mr: "0.5vw" }}
                        onClick={toggleMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor="top" open={isMenuOpen} onClose={toggleMenu}>
                        <Box
                            sx={{
                                // p: 2,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {[
                                "Home",
                                "About",
                                "Events",
                                "Newsletter",
                                "MeetUs",
                                "FAQ",
                                "Sponsors",
                            ].map((text, index) => (
                                <Button
                                    key={text}
                                    color="inherit"
                                    sx={{ width: "100vw" }}
                                    onClick={() => handleNavigation(index)}
                                >
                                    {text.toUpperCase()}
                                </Button>
                            ))}
                        </Box>
                    </Drawer>
                </Hidden>
                <Hidden mdDown>
                    <Box
                        sx={{
                            display: "flex",
                            marginLeft: "auto",
                            marginRight: "1.5vw",
                            "& > button": {
                                fontWeight: 700,
                                fontSize: "1rem",
                                padding: "5px 16px",
                                position: "relative",
                                paddingBottom: "0.2rem",
                                "&:hover": {
                                    "&::after": {
                                        transform: "scaleX(1)",
                                    },
                                },
                            },
                        }}
                    >
                        {[
                            "Home",
                            "About",
                            "Events",
                            "Newsletter",
                            "MeetUs",
                            "FAQ",
                            "Sponsors",
                        ].map((text, index) => (
                            <Button
                                key={text}
                                color="inherit"
                                onClick={() => handleNavigation(index)}
                                sx={{
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        left: 0,
                                        bottom: 0,
                                        width: "100%",
                                        height: 2,
                                        backgroundColor: "white",
                                        transform:
                                            currentIndex === index
                                                ? "scaleX(1)"
                                                : "scaleX(0)",
                                        transformOrigin: "left",
                                        transition:
                                            "transform 0.3s ease-in-out",
                                    },

                                    color:
                                        currentIndex === index
                                            ? "#FFFFFF"
                                            : "inherit", // Optional: change text color if active
                                    "&:hover": {
                                        backgroundColor: "#2D2D2D",
                                    },
                                }}
                            >
                                {text.toUpperCase()}
                            </Button>
                        ))}
                    </Box>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
