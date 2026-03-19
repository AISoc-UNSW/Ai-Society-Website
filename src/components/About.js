import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AISoc from "../assets/aisoc-group-photo.webp";
import Reveal from "../util/Reveal";
import SocialMediaIcons from "../util/Icons";
import PhotoStack from "../util/PhotoStack";
import test from "../assets/build.webp";

// Placeholder stack (same image repeated)
const images = [AISoc, test, AISoc, test, AISoc];

const handleClick = () => {
  window.location.href = "mailto:unsw.ai.soc@gmail.com";
};

const About = () => {
  return (
    <Box
      id="about"
      sx={{
        padding: "5% 10% 5% 10%",
        color: "white",
      }}
    >
      <Reveal>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* LEFT SIDE */}
          <Box
            sx={{
              width: { xs: "100%", md: "55%" },
              textAlign: "left",
              paddingRight: { md: "30px" },
              paddingBottom: { xs: "30px", md: 0 },
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: "bold",
                fontFamily: "Ubuntu Sans",
              }}
            >
              Empowering Minds, Advancing AI: Exploring the Frontiers of
              Artificial Intelligence
            </Typography>

            <Typography
              sx={{
                paddingBottom: "20px",
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "20px",
                fontFamily: "Ubuntu Sans",
              }}
            >
              Welcome to our society at UNSW, dedicated to the study and
              application of artificial intelligence. Through engaging events,
              workshops, and projects, we aim to foster a community of AI
              enthusiasts and drive innovation in this rapidly evolving field.
            </Typography>

            <SocialMediaIcons />

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
              GET IN TOUCH
            </Button>
          </Box>

          {/* RIGHT SIDE */}
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <PhotoStack images={images} />

            {/* Interaction hint */}
            <Typography
              sx={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.6)",
                mt: 1,
              }}
            >
              Click to explore →
            </Typography>
          </Box>
        </Box>
      </Reveal>
    </Box>
  );
};

export default About;