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
import { TypeAnimation } from "react-type-animation";
import Logo from "../assets/logo.png";
import { textList } from "../util/typingText";
import { shuffleArray } from "../util/shuffle";

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
    shuffleArray(textList);
    textList.unshift("AISOC");

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
                        <TypeAnimation
                            defaultText="AISOC"
                            sequence={textList.flatMap((item) => [
                                item,
                                2000 * Math.random() + 5000,
                            ])}
                            style={{ fontWeight: 700, fontSize: "1rem" }}
                            speed={{ type: "keyStrokeDelayInMs", value: 50 }}
                            deletionSpeed={80}
                            repeat={Infinity}
                            cursor={true}
                        />
                    </Box>
                </a>
                <Hidden lgUp>
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
                <Hidden lgDown>
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
