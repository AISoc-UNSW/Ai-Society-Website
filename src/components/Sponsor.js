import React from "react";
import { Box, Typography, Button, AppBar } from "@mui/material";
import { Link } from "react-scroll";
import Unova from "../assets/unova.png";
const Sponsor = () => {
    return (
        <Box
            id="sponsor"
            sx={{
                textAlign: "center",
                margin: "60px 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: "15px" }}
            >
                Proudly Sponsored by
            </Typography>
            <img
                src={Unova}
                style={{ width: "500px", height: "auto", marginBottom: "20px" }}
                alt="Unova"
            />
            <Button
                variant="outlined"
                href="#outlined-buttons"
                sx={{
                    color: "black",
                    borderColor: "black",
                    "&:hover": {
                        backgroundColor: "#B9B7BD",
                        borderColor: "black",
                    },
                }}
            >
                Sponsor Us
            </Button>
        </Box>
    );
};

export default Sponsor;
