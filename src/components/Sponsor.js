import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import UNSWFounders from "../assets/companies/unsw-founders1.webp";
import Microsoft from "../assets/companies/microsoft.webp";
import Quantium from "../assets/companies/quantium.webp";
import Lovable from "../assets/companies/lovable.webp";
import Notion from "../assets/companies/notion.webp";
import Lorikeet from "../assets/companies/lorikeet.webp";
import Preve from "../assets/companies/preve.webp";
import CGI from "../assets/companies/cgi.webp";
import Reveal from "../util/Reveal";

const handleClick = () => {
  window.location.href = "mailto:partnerships@unswaisoc.com";
};

const sponsors = [
  { name: "UNSW Founders", logo: UNSWFounders, url: "https://www.unswfounders.com", size: 160 },
  { name: "Microsoft", logo: Microsoft, url: "https://www.microsoft.com", size: 400 },
  { name: "Quantium", logo: Quantium, url: "https://www.quantium.com", size: 130 },
  { name: "Lovable", logo: Lovable, url: "https://lovable.dev", size: 700 },
  { name: "Notion", logo: Notion, url: "https://www.notion.so", size: 400 },
  { name: "Lorikeet", logo: Lorikeet, url: "https://lorikeet.com", size: 125 },
  { name: "Preve", logo: Preve, url: "https://preve.com", size: 110 },
  { name: "CGI", logo: CGI, url: "https://www.cgi.com", size: 60 },
];

const Sponsor = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      id="sponsor"
      ref={sectionRef}
      sx={{
        padding: "5% 10%",
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
              marginBottom: "20px",
              fontFamily: "Ubuntu Sans",
            }}
          >
            Collaborations with
          </Typography>

          {/* Sponsor Panel */}
          <Box
            sx={{
              // background:
              //   "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(245,245,245,0.70))",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "14px",
              padding: "50px 40px",
              width: "100%",
              maxWidth: "1100px",
              marginTop: "25px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",

              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {/* Sponsor Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "40px",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              {sponsors.map((sponsor, index) => (
                <Box
                  key={index}
                  component="a"
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    width: "180px",
                    height: "90px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    borderRadius: "6px",
                    overflow: "hidden",

                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",

                    transition: `
                      opacity 0.4s ease ${index * 0.35}s,
                      transform 0.4s ease ${index * 0.35}s
                    `,

                    "&:hover img": {
                      transform: "scale(1.06)",
                      filter: "brightness(1.15)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={sponsor.logo}
                    alt={sponsor.name}
                    sx={{
                      width: `${sponsor.size}px`,
                      height: "70px",
                      objectFit: "contain",
                      filter: "grayscale(0.15) brightness(0.95) contrast(1.05)",
                      transition: "filter 0.25s ease, transform 0.2s ease",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          <Button
            variant="outlined"
            onClick={handleClick}
            sx={{
              marginTop: "40px",
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
  );
};

export default Sponsor;
