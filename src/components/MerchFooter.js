import React from "react";
import { Box, Typography } from "@mui/material";
// import Logo from "../assets/aisoc-logo.webp";
// import ArcLogo from "../assets/arc-club-logo.webp";
import SocialMediaIcons from "../util/Icons";
import { useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";

const MerchFooter = ({ onLightBackground = false }) => {
  const outerStyles = () => ({
    padding: "3rem",
    // backgroundColor: "#100b28",
  });
  const location = useLocation();
  // Only show 'Built by IT' on specific pages
  const builtByRoutes = ["/merch", "/shop", "/cart"];
  const isProductPage = location.pathname.startsWith("/product/");
  const showBuiltBy = builtByRoutes.includes(location.pathname) || isProductPage;
  
  const developers = [
    { name: "Henrick Lin", github: "https://github.com/CUinspace233" },
    { name: "Kathy Yang", github: "https://github.com/CHELSEADOPAMIN" },
    { name: "Abhishek", github: "https://github.com/amoramganti" },
  ];
  const builtBy = developers.map((developer, idx) => (
    <React.Fragment key={developer.github}>
      <a
        href={developer.github}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: onLightBackground ? "#000" : "#fff" }}
      >
        {developer.name}
      </a>
      {idx < developers.length - 1 ? ", " : ""}
    </React.Fragment>
  ));
  return (
    <Box sx={outerStyles}>
      <Box sx={{ textAlign: "left", color: onLightBackground ? "#000" : "#fff" }}>
        {/* <Link to="/">
          <img src={Logo} style={{ width: "200px", margin: "0 -38px" }} alt="logo" />
        </Link>
        <img
          src={ArcLogo}
          style={{
            height: "142px",
            margin: "38px",
            marginTop: "0px",
            marginBottom: "31px",
          }}
          alt="arc logo"
        /> */}
        <Box>
          <Typography sx={{ fontFamily: "Ubuntu Sans" }}>The AI Society of UNSW</Typography>
          <SocialMediaIcons />
          <Typography
            sx={{
              fontFamily: "Ubuntu Sans",
              paddingTop: "10px",
              borderTop: "2px solid silver",
            }}
          >
            © {new Date().getFullYear()} — AISoc UNSW
            {showBuiltBy && builtBy.length ? <> | Built by IT - {builtBy}</> : ""}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MerchFooter;
