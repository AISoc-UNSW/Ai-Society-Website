import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Unova from "../assets/unova.webp";
import rungpu from "../assets/rungpu.webp";
import bg from "../assets/purple-bg.webp";
import Reveal from "../util/Reveal";

const handleClick = () => {
  window.location.href = "mailto:partnerships@unswaisoc.com";
};

const Sponsor = () => {
  return (
    <>
      <Box
        id="sponsor"
        sx={{
          padding: "5% 10% 5% 10%",
          // backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
        }}
      >
        <Reveal>
          <Box
            id="sponsor"
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                marginBottom: "15px",
                fontFamily: "Ubuntu Sans",
              }}
            >
              Proudly Sponsored by
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "50px",
              }}
            >
              <img
                src={Unova}
                style={{
                  width: "500px",
                  maxWidth: "45vw",
                  height: "auto",
                  objectFit: "contain",
                  marginBottom: "20px",
                }}
                alt="Unova"
              />
              <img
                src={rungpu}
                style={{
                  width: "450px",
                  maxWidth: "45vw",
                  height: "auto",
                  objectFit: "contain",
                  marginBottom: "20px",
                }}
                alt="rungpu"
              />
            </div>
            <Button
              variant="outlined"
              onClick={handleClick}
              sx={{
                color: "white",
                fontWeight: "bold",
                borderColor: "white",
                fontFamily: "Ubuntu Sans",
                fontSize: "18px",
                "&:hover": {
                  backgroundColor: "#1d1740",
                  borderColor: "white",
                },
              }}
            >
              Sponsor Us
            </Button>
          </Box>
        </Reveal>
      </Box>
    </>
  );
};

export default Sponsor;
