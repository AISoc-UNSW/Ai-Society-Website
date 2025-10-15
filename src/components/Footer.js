import React from "react";
import { Box, Typography } from "@mui/material";
import Logo from "../assets/aisoc-logo.webp";
import ArcLogo from "../assets/arc-club-logo.webp";
import SocialMediaIcons from "../util/Icons";

const Footer = ({ onLightBackground = false }) => {
  const outerStyles = () => ({
    padding: "3rem",
    // backgroundColor: "#100b28",
  });
  return (
    <Box sx={outerStyles}>
      <Box sx={{ textAlign: "left", color: onLightBackground ? "#000" : "#fff" }}>
        <img
          src={Logo}
          style={{ width: "200px", margin: "0 -38px" }}
          alt="logo"
        />
        <img
          src={ArcLogo}
          style={{
            height: "142px",
            margin: "38px",
            marginTop: "0px",
            marginBottom: "31px",
          }}
          alt="arc logo"
        />
        <Box>
          <Typography sx={{ fontFamily: "Ubuntu Sans" }}>
            The AI Society of UNSW
          </Typography>
          <SocialMediaIcons />
          <Typography
            sx={{
              fontFamily: "Ubuntu Sans",
              paddingTop: "10px",
              borderTop: "2px solid silver",
            }}
          >
            © 2024 — AISoc UNSW
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
