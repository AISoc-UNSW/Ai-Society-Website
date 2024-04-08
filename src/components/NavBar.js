import { React, useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-scroll";
import Logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "-120px",
        background: "transparent",
        height: 120, // Initial height
    },
    shrink: {
        height: 64, // Shrunk height
        // marginTop: "-64px",
    },
}));

const NavBar = () => {
    const classes = useStyles();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const listener = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", listener);
        return () => {
            window.removeEventListener("scroll", listener);
        };
    }, []);

    return (
        <AppBar
            sx={{
                transition:
                    "height 0.5s ease, background-color 0.3s ease, padding-top 0.5s ease",
                backgroundColor: isScrolled ? "#480A53" : "transparent",
                paddingTop: isScrolled ? "" : "3vh",
                boxShadow: "none",
            }}
            position="sticky"
            className={`${classes.root} ${isScrolled ? classes.shrink : ""}`}
        >
            <Toolbar sx={{ minHeight: "64px" }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "2.5vw",
                    }}
                >
                    <img src={Logo} style={{ width: 50, marginRight: 10 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
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
                        marginLeft: "auto",
                        marginRight: "1.5vw",
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
                            to="about"
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
                            to="events"
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
                            to="sponsor"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            SPONSOR
                        </Link>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

const appbarcontent = () => {
    return (
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
        </Toolbar>
    );
};

export default NavBar;
