import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Reveal from "../util/Reveal";
import unswFounders from "../assets/unsw+logo+new.webp";
import microsoft from "../assets/microsoft.webp";
import quantium from "../assets/quantium-logo.webp";
import lovable from "../assets/lovable-logo.webp";
import notion from "../assets/notion.webp";
import lorikeet from "../assets/lorikeet-logo.webp";
import preve from "../assets/preve-logo.webp";
import cgi from "../assets/cgi-logo.webp";

const handleClick = () => {
  window.location.href = "mailto:partnerships@unswaisoc.com";
};

const collaborators = [
  { name: "UNSW Founders", logo: unswFounders, url: "https://www.unswfounders.com", filter: false },
  { name: "Microsoft", logo: microsoft, url: "https://www.microsoft.com", filter: false },
  { name: "Quantium", logo: quantium, url: "https://www.quantium.com", filter: true },
  { name: "Lovable", logo: lovable, url: "https://lovable.dev", filter: false },
  { name: "Notion", logo: notion, url: "https://www.notion.so", filter: false },
  { name: "Lorikeet", logo: lorikeet, url: "https://www.lorikeet.com.au", filter: false },
  { name: "Preve", logo: preve, url: "https://www.preve.com.au", filter: false },
  { name: "CGI", logo: cgi, url: "https://www.cgi.com", filter: false },
];

const Sponsor = () => {
  return (
    <>
      <Box
        id="sponsor"
        sx={{
          padding: "5% 10% 5% 10%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
        }}
      >
        <Reveal>
          <Box
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
                marginBottom: "40px",
                fontFamily: "Ubuntu Sans",
              }}
            >
              Collaborations with...
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "40px",
                marginBottom: "40px",
                maxWidth: "900px",
              }}
            >
              {collaborators.map((collab) => (
                
                  <a key={collab.name}
                  href={collab.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={collab.logo}
                    alt={collab.name}
                    style={{
                      height: "50px",
                      width: "auto",
                      maxWidth: "160px",
                      objectFit: "contain",
                      filter: collab.filter ? "brightness(0) invert(1)" : "none",
                      opacity: 0.85,
                      transition: "opacity 0.2s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = 1)}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = 0.85)}
                  />
                </a>
              ))}
            </Box>
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