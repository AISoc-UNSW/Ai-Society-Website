import { React } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import Logo from "../assets/logo.webp";

const NavBar2 = () => {
    return (
        <AppBar
            sx={{
                backgroundColor: "#480A53",
            }}
            position="sticky"
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
            </Toolbar>
        </AppBar>
    );
};

export default NavBar2;
