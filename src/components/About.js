import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Reveal from "../util/Reveal";
import SocialMediaIcons from "../util/Icons";
import PhotoStack from "../util/PhotoStack";

import FoundingTeamPhoto from "../assets/photobooth/build.webp";
import OWeekPhoto from "../assets/photobooth/aisoc-group-photo.webp";
import LovableHackathonPhoto from "../assets/photobooth/aisoc-lovable-hackathon.webp";
import PodcastPhoto from "../assets/photobooth/neurons-and-notions.webp";
import QuantiumPhoto from "../assets/photobooth/aisoc-quantium.webp";

// Placeholder stack (same image repeated)
const images = [
  {src: LovableHackathonPhoto, caption: "AISoc X Lovable Hackathon"},
  {src: OWeekPhoto, caption: "O-Week 2026"},
  {src: PodcastPhoto, caption: "Neurons and Notions Podcast"},
  {src: QuantiumPhoto, caption: "AISoc @ Quantium"},
  {src: FoundingTeamPhoto, caption: "Founding Team"},
];

const handleClick = () => {
  window.location.href = "mailto:unsw.ai.soc@gmail.com";
};

const About = () => {
  return (
    <Box
      id="about"
      sx={{
        paddingTop: { xs: "2%", md: "3%" },
        paddingRight: "10%",
        paddingBottom: "5%",
        paddingLeft: "10%",
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
            rowGap: { xs: 3, md: 0 },
          }}
        >
          {/* LEFT SIDE */}
          <Box
            sx={{
              width: { xs: "100%", md: "55%" },
              order: { xs: 2, md: 1 },
              textAlign: "left",
              paddingRight: { md: "30px" },
              paddingTop: { xs: "30px", md: 0 },
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
                color: "rgba(174, 171, 171, 0.8)",
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
              order: { xs: 1, md: 2 },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-end" },
              paddingBottom: { xs: "40px", md: 0 },
            }}
          >
            <PhotoStack images={images} />
          </Box>
        </Box>
      </Reveal>
    </Box>
  );
};

export default About;
