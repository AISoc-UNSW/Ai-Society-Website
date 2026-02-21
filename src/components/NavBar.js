import { React, useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Hidden,
    IconButton,
    Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@material-ui/core";
import { TypeAnimation } from "react-type-animation";
import Logo from "../assets/logo.webp";
import { textList } from "../util/typingText";
import { shuffleArray } from "../util/shuffle";
import { swapRandomLetters } from "../util/typoEffect";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "transparent",
        height: 120, // Initial height
        marginTop: "-120px",
    },
    shrink: {
        minHeight: 64, // Shrunk height
        height: "auto",
    },
}));

const buttonStyles = {
    position: "relative",
    fontWeight: "bold",
    "&::after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "2px",
        backgroundColor: "currentColor",
        transform: "scaleX(0)",
        transition: "transform 0.3s ease-in-out",
    },
    "&:hover::after": {
        transform: "scaleX(1)",
        transformOrigin: "bottom left",
    },
};

const NavBar = () => {
    const classes = useStyles();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const listener = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", listener);
        return () => {
            window.removeEventListener("scroll", listener);
        };
    }, []);

    const displayList = textList
        .filter((text) => {
            if (Math.random() <= text.chanceMultiplier) return true;
            return false;
        })
        .map((text) => {
            return text.text;
        });

    shuffleArray(displayList);
    displayList.unshift("AISOC");

    // Spelling/typo mistake effect
    const processTypoStrings = (strings, mistakeChance) => {
        let newStrings = [];
        for (const originalString of strings) {
            const words = originalString.split(" ");
            let currentString = [];

            for (let i = 0; i < words.length; i++) {
                const originalWord = words[i];
                const swappedWord = swapRandomLetters(
                    originalWord,
                    mistakeChance
                );
                currentString[i] = swappedWord; // Update the word in the array
                if (originalWord !== swappedWord) {
                    newStrings.push(currentString.join(" "));
                    newStrings.push(250);
                    currentString[i] = originalWord;
                }
            }

            newStrings.push(words.join(" "));
            newStrings.push((el) => el.classList.remove("type"));
            newStrings.push(2000 * Math.random() + 10000);
            newStrings.push((el) => el.classList.add("delete"));
            newStrings.push("");
            newStrings.push((el) => el.classList.remove("delete"));
            newStrings.push((el) => el.classList.add("think"));
            newStrings.push(2000 * Math.random() + 3000);
            newStrings.push((el) => el.classList.remove("think"));
            newStrings.push((el) => el.classList.add("type"));
        }

        return newStrings;
    };
    const alteredList = processTypoStrings(displayList, 0.1);
    return (
        <AppBar
            sx={{
                transition:
                    "height 1s ease, background-color 1s ease, padding-top 1s ease",
                backgroundColor: isScrolled ? "#1F1F23" : "transparent",
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
                            aria-label="AISOC"
                            sequence={alteredList}
                            style={{ fontWeight: 700, fontSize: "1rem" }}
                            speed={{ type: "keyStrokeDelayInMs", value: 50 }}
                            deletionSpeed={80}
                            repeat={Infinity}
                            cursor={false}
                        />
                        <style global="true">{`
                            .type::after {
                                content: "•";
                                font-size: 3rem;
                                margin-left: 0.25rem;
                                vertical-align: middle;
                                transform-origin: center;
                                line-height: 0.33;
                            }
                            .think::after {
                                content: "•";
                                font-size: 3rem;
                                margin-left: 0.25rem;
                                animation: pulse 1.25s infinite;
                                vertical-align: middle;
                                transform-origin: center;
                            }
                            .delete::after {
                                content: "|";
                                font-size: 1.5rem;
                                vertical-align: baseline;
                                animation: cursor 1.1s infinite step-start;
                                line-height: 0.6;
                            }
                            @keyframes pulse {
                                50% {
                                    opacity: 0.5;
                                }
                            }
                            @keyframes cursor {
                                50% {
                                    opacity: 0;
                                }
                            }
                        `}</style>
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
                            <Link
                                activeClass="active"
                                to="about"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                onClick={toggleMenu}
                            >
                                <Button color="inherit" sx={{ width: "100vw" }}>
                                    ABOUT
                                </Button>
                            </Link>
                            <Link
                                activeClass="active"
                                to="events"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                onClick={toggleMenu}
                            >
                                <Button color="inherit" sx={{ width: "100vw" }}>
                                    EVENTS
                                </Button>
                            </Link>
                            <Link
                                activeClass="active"
                                to="newsletter"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                onClick={toggleMenu}
                            >
                                <Button color="inherit" sx={{ width: "100vw" }}>
                                    NEWSLETTER
                                </Button>
                            </Link>
                            <Link
                                activeClass="active"
                                to="team"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                onClick={toggleMenu}
                            >
                                <Button color="inherit" sx={{ width: "100vw" }}>
                                    TEAM
                                </Button>
                            </Link>
                            <Link
                                activeClass="active"
                                to="faq"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                onClick={toggleMenu}
                            >
                                <Button color="inherit" sx={{ width: "100vw" }}>
                                    FAQ
                                </Button>
                            </Link>
                            <Link
                                activeClass="active"
                                to="sponsor"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                onClick={toggleMenu}
                            >
                                <Button color="inherit" sx={{ width: "100vw" }}>
                                    SPONSOR
                                </Button>
                            </Link>
                            <Button
                                color="inherit"
                                sx={{ width: "100vw" }}
                                component={RouterLink}
                                to="/merch"
                                onClick={toggleMenu}
                            >
                                MERCH
                            </Button>
                        </Box>
                    </Drawer>
                </Hidden>
                <Hidden lgDown>
                    <Box
                        sx={{
                            display: "flex",
                            marginLeft: "auto",
                            marginRight: "1.5vw",
                        }}
                    >
                        <Link
                            activeClass="active"
                            to="about"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            <Button color="inherit" sx={buttonStyles}>
                                ABOUT
                            </Button>
                        </Link>
                        <Link
                            activeClass="active"
                            to="events"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            <Button color="inherit" sx={buttonStyles}>
                                EVENTS
                            </Button>
                        </Link>
                        <Link
                            activeClass="active"
                            to="newsletter"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            <Button color="inherit" sx={buttonStyles}>
                                NEWSLETTER
                            </Button>
                        </Link>
                        <Button color="inherit" sx={buttonStyles} component={RouterLink} to="/merch">
                            MERCH
                        </Button>
                        <Link
                            activeClass="active"
                            to="team"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            <Button color="inherit" sx={buttonStyles}>
                                TEAM
                            </Button>
                        </Link>
                        <Link
                            activeClass="active"
                            to="faq"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            <Button color="inherit" sx={buttonStyles}>
                                FAQ
                            </Button>
                        </Link>
                        <Link
                            activeClass="active"
                            to="sponsor"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            <Button color="inherit" sx={buttonStyles}>
                                SPONSOR
                            </Button>
                        </Link>
                    </Box>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
