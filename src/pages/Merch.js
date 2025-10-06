import React, { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Merch = () => {
  const [isLoading, setLoading] = useState(true);
  const isBelowMd = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    setLoading(false);
  }, []);

  // Merchandise items data - these will need actual images
  const merchItems = [
    {
      id: 1,
      name: "Hoodies",
      color: "Beige",
      // TODO: Add actual hoodie image path here
      image: null,
      alt: "AISOC Beige Hoodie",
    },
    {
      id: 2,
      name: "T Shirts",
      color: "Black",
      // TODO: Add actual t-shirt image path here
      image: null,
      alt: "AISOC Black T-Shirt",
    },
    {
      id: 3,
      name: "Crewnecks",
      color: "Beige",
      // TODO: Add actual crewneck image path here
      image: null,
      alt: "AISOC Beige Crewneck",
    },
    {
      id: 4,
      name: "Hoodies",
      color: "Black",
      image: null,
      alt: "AISOC Black Hoodie",
    },
    {
      id: 5,
      name: "T Shirts",
      color: "Beige",
      image: null,
      alt: "AISOC Beige T-Shirt",
    },
    {
      id: 6,
      name: "Crewnecks",
      color: "Black",
      image: null,
      alt: "AISOC Black Crewneck",
    },
  ];

  // Mobile categories grid content (simple placeholders for now)
  const mobileCategories = [
    { id: "banner", type: "banner" },
    { id: "tshirts", label: "T Shirts", tone: "dark" },
    { id: "crewnecks", label: "Crewnecks", tone: "light" },
    { id: "hoodies", label: "Hoodies", tone: "dark" },
    { id: "accessories", label: "Accessories", tone: "dark" },
  ];

  // Slider settings for carousel
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <LoadingScreen twoSeconds={false} isLoading={isLoading} />
      <Box
        sx={{
          backgroundColor: "#efefef",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {/* Hero Section matching Figma design */}
        <Box
          sx={{
            position: "relative",
            height: { xs: "auto", md: "820px" },
            backgroundColor: "#efefef",
            overflow: "visible",
            isolation: "isolate", // ensure mix-blend-mode blends against this background
          }}
        >
          {/* Simple Navigation Bar */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: "80px",
              padding: "20px",
              zIndex: 10,
            }}
          >
            <RouterLink
              to="/home"
              style={{
                textDecoration: "none",
                color: "#000",
                fontSize: "20px",
                fontFamily: "Helvetica, sans-serif",
                fontWeight: 300,
              }}
            >
              Home
            </RouterLink>
            <Typography
              sx={{
                color: "#000",
                fontSize: "20px",
                fontFamily: "Helvetica, sans-serif",
                fontWeight: 300,
              }}
            >
              Shop
            </Typography>
          </Box>

          {/* Large "aisoc" text logo (desktop/tablet) */}
          <Box
            sx={{
              position: "absolute",
              top: "40px",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              width: "100%",
              zIndex: 3,
              display: { xs: "none", md: "block" },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "80px", sm: "120px", md: "180px" },
                fontWeight: "bold",
                color: "#5a5a5a",
                letterSpacing: "-5px",
                fontFamily: "Helvetica, Arial, sans-serif",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              aisoc
            </Typography>
          </Box>

          {/* Group photo */}
          <Box
            sx={{
              position: { xs: "relative", md: "absolute" },
              top: { xs: 0, md: "170px" },
              left: { xs: "auto", md: "50%" },
              transform: { xs: "none", md: "translateX(-50%)" },
              zIndex: 2,
              display: "flex",
              justifyContent: "center",
              width: "100%",
              pointerEvents: "auto",
            }}
          >
            <img
              src={isBelowMd ? "/temp-merch-group-photo-full-bg.png" : "/temp-merch-group-photo.png"}
              alt="AISOC merch group"
              style={{
                width: isBelowMd ? "100vw" : "min(700px, 85vw)",
                height: "auto",
                display: "block",
                mixBlendMode: "lighten", // visually remove black background against light backdrop
                filter: "brightness(1.05)",
              }}
            />
            {/* Mobile-only green logo positioned inside image top-right */}
            <Box
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 4,
                display: { xs: "block", md: "none" },
                textAlign: "right",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: "28px",
                  lineHeight: 1,
                  color: "#2ee66b",
                  letterSpacing: "-0.5px",
                }}
              >
                aisoc
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#2ee66b",
                  letterSpacing: "0.5px",
                  marginTop: "2px",
                }}
              >
                unsw
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Mobile Grid Section (xs) */}
        <Box sx={{ display: { xs: "block", md: "none" }, padding: "16px", backgroundColor: "#efefef" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            {mobileCategories.map((cell) => {
              if (cell.type === "banner") {
                return (
                  <Box key={cell.id} sx={{ gridColumn: "1 / -1", position: "relative", overflow: "hidden" }}>
                    <Box sx={{ height: "210px", backgroundColor: "#e0e0e0" }}>
                      <img
                        src={"/temp-merch-group-photo-full-bg.png"}
                        alt="AISOC collection"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        position: "absolute",
                        bottom: "8px",
                        left: "8px",
                        color: "#ffffff",
                        fontSize: "11px",
                        letterSpacing: "0.3px",
                        textShadow: "0 1px 2px rgba(0,0,0,0.35)",
                        fontFamily: "Helvetica, Arial, sans-serif",
                      }}
                    >
                      Shop Collection
                    </Typography>
                  </Box>
                );
              }

              const isLight = cell.tone === "light";
              return (
                <Box key={cell.id} sx={{ position: "relative", height: "210px", overflow: "hidden", backgroundColor: isLight ? "#d3cfc5" : "#3a3a3a" }}>
                  {/* Placeholder center content */}
                  <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img
                      src={"/temp-merch-group-photo.png"}
                      alt={cell.label}
                      style={{ width: "120%", height: "100%", objectFit: "cover", opacity: isLight ? 0.4 : 0.25 }}
                    />
                  </Box>
                  <Box sx={{ position: "absolute", left: "10px", bottom: "10px" }}>
                    <Typography sx={{ color: isLight ? "#4b4b4b" : "#ffffff", fontSize: "14px", fontWeight: 600, fontFamily: "SF Pro Display, Helvetica, sans-serif" }}>
                      {cell.label}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Carousel Section (md+) */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            padding: { xs: "40px 10px", md: "60px 20px" },
            backgroundColor: "#efefef",
          }}
        >
        <Box sx={{ maxWidth: "1400px", margin: "0 auto", "& .slick-list": { margin: "0 -5px" }, "& .slick-slide > div": { padding: "0 5px" } }}>
            <Slider {...sliderSettings}>
              {merchItems.map((item) => (
                <Box key={item.id}>
                  <Box
                    sx={{
                      position: "relative",
                      height: "547px",
                      backgroundColor: item.color === "Beige" ? "#d3cfc5" : "#3a3a3a",
                      borderRadius: "0px",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    {/* Placeholder for actual merch image */}
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: item.color === "Beige" ? "#d3cfc5" : "#3a3a3a",
                      }}
                    >
                      <Typography
                        sx={{
                          color: item.color === "Beige" ? "#5a5a5a" : "#fff",
                          fontSize: "24px",
                          fontWeight: "bold",
                          fontFamily: "Ubuntu Sans",
                          textAlign: "center",
                        }}
                      >
                        {item.name}
                        <br />
                        {item.color}
                      </Typography>
                    </Box>

                    {/* Item Label at bottom */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "20px",
                        left: "20px",
                        right: "20px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "SF Pro Display, Helvetica, sans-serif",
                          fontSize: "20px",
                          fontWeight: 500,
                          color: "#fff",
                          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Merch;
