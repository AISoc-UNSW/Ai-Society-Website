import { React, useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Hidden,
    IconButton,
    Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-scroll';
import Logo from '../assets/logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '-120px',
        background: 'transparent',
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const listener = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', listener);
        return () => {
            window.removeEventListener('scroll', listener);
        };
    }, []);

    return (
        <AppBar
            sx={{
                transition:
                    'height 0.5s ease, background-color 0.3s ease, padding-top 0.5s ease',
                backgroundColor: isScrolled ? '#1F1F23' : 'transparent',
                opacity: isScrolled ? 0.95 : 1,
                paddingTop: isScrolled ? '' : '3vh',
                boxShadow: 'none',
            }}
            position="sticky"
            className={`${classes.root} ${isScrolled ? classes.shrink : ''}`}
        >
            <Toolbar sx={{ minHeight: '64px' }}>
                <a
                    href="/"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '2.5vw',
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
                                display: { display: 'flex' },
                                fontFamily: 'monospace',
                                marginRight: '6px',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
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
                        sx={{ ml: 'auto', mr: '0.5vw' }}
                        onClick={toggleMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor="top" open={isMenuOpen} onClose={toggleMenu}>
                        <Box
                            sx={{
                                // p: 2,
                                display: 'flex',
                                flexDirection: 'column',
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
                                <Button color="inherit" sx={{ width: '100vw' }}>
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
                                <Button color="inherit" sx={{ width: '100vw' }}>
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
                                <Button color="inherit" sx={{ width: '100vw' }}>
                                    NEWSLETTER
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
                                <Button color="inherit" sx={{ width: '100vw' }}>
                                    SPONSOR
                                </Button>
                            </Link>
                        </Box>
                    </Drawer>
                </Hidden>
                <Hidden mdDown>
                    <Box
                        sx={{
                            display: 'flex',
                            marginLeft: 'auto',
                            marginRight: '1.5vw',
                            // justifyContent: "space-evenly",
                            '& > button': {
                                fontWeight: 700,
                                position: 'relative',
                                paddingBottom: '0.2rem', // Add some padding at the bottom of the button
                                '&:hover': {
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        left: 0,
                                        bottom: 0, // Position the underline at the bottom of the text
                                        width: '100%',
                                        height: 2,
                                        backgroundColor: 'white',
                                        transform: 'scaleX(1)',
                                        transformOrigin: 'left', // Set the transform origin to the left
                                        transition:
                                            'transform 0.3s ease-in-out',
                                    },
                                },
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 0, // Position the underline at the bottom of the text
                                    width: '100%',
                                    height: 2,
                                    backgroundColor: 'white',
                                    transform: 'scaleX(0)',
                                    transformOrigin: 'left', // Set the transform origin to the left
                                    transition: 'transform 0.3s ease-in-out',
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
                                to="newsletter"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                            >
                                NEWSLETTER
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
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;

// const AppbarButtons = () => {
//     return (
//         <Box>
//             <Button color="inherit">
//                 <Link
//                     activeClass="active"
//                     to="about"
//                     spy={true}
//                     smooth={true}
//                     offset={-70}
//                     duration={500}
//                 >
//                     ABOUT
//                 </Link>
//             </Button>
//             <Button color="inherit">
//                 <Link
//                     activeClass="active"
//                     to="events"
//                     spy={true}
//                     smooth={true}
//                     offset={-70}
//                     duration={500}
//                 >
//                     EVENTS
//                 </Link>
//             </Button>
//             <Button color="inherit">
//                 <Link
//                     activeClass="active"
//                     to="section2"
//                     spy={true}
//                     smooth={true}
//                     offset={-70}
//                     duration={500}
//                 >
//                     CONTACT
//                 </Link>
//             </Button>
//             <Button color="inherit">
//                 <Link
//                     activeClass="active"
//                     to="sponsor"
//                     spy={true}
//                     smooth={true}
//                     offset={-70}
//                     duration={500}
//                 >
//                     SPONSOR
//                 </Link>
//             </Button>
//         </Box>
//     );
// };
