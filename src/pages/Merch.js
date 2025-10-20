import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Footer from "../components/Footer";
import LazyImage from "../components/LazyImage";
import MerchNavBar from "../components/MerchNavBar";

const Merch = () => {
  const isBelowMd = useMediaQuery("(max-width:900px)");
  const pageTitle = "UNSW AI Society Merch | AISOC Merchandise Collection";
  const pageDescription =
    "Explore official UNSW AI Society (AISOC) merchandise including hoodies, crewnecks, t-shirts, and accessories. Support the UNSW AI community with our limited release apparel.";
  const pageKeywords =
    "UNSW Artificial Intelligence Society, AISOC merchandise, UNSW hoodies, AI Society apparel, UNSW student club merch, UNSW AISOC shop";
  const pageUrl = "https://unswaisoc.com/merch";
  const pageImage = "https://res.cloudinary.com/dlpcuxx7y/image/upload/v1760694826/group-photo_zbydap.webp";

  useEffect(() => {
    const previousTitle = document.title;
    document.title = pageTitle;

    const metaSelectors = [
      { selector: 'meta[name="description"]', content: pageDescription },
      { selector: 'meta[name="keywords"]', content: pageKeywords },
      { selector: 'meta[property="og:title"]', content: pageTitle },
      { selector: 'meta[property="og:description"]', content: pageDescription },
      { selector: 'meta[property="og:url"]', content: pageUrl },
      { selector: 'meta[property="og:image"]', content: pageImage },
      { selector: 'meta[name="twitter:title"]', content: pageTitle },
      { selector: 'meta[name="twitter:description"]', content: pageDescription },
      { selector: 'meta[name="twitter:image"]', content: pageImage },
    ];

    const previousMetaValues = metaSelectors.map(({ selector, content }) => {
      const element = document.querySelector(selector);
      const originalContent = element?.getAttribute("content") ?? null;
      if (element) {
        element.setAttribute("content", content);
      }
      return { element, originalContent };
    });

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    let previousCanonicalHref = null;
    let canonicalCreated = false;

    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      canonicalLink.setAttribute("href", pageUrl);
      document.head.appendChild(canonicalLink);
      canonicalCreated = true;
    } else {
      previousCanonicalHref = canonicalLink.getAttribute("href");
      canonicalLink.setAttribute("href", pageUrl);
    }

    return () => {
      document.title = previousTitle;
      previousMetaValues.forEach(({ element, originalContent }) => {
        if (!element) return;
        if (originalContent === null) {
          element.removeAttribute("content");
        } else {
          element.setAttribute("content", originalContent);
        }
      });

      if (canonicalLink) {
        if (canonicalCreated) {
          document.head.removeChild(canonicalLink);
        } else if (previousCanonicalHref === null) {
          canonicalLink.removeAttribute("href");
        } else {
          canonicalLink.setAttribute("href", previousCanonicalHref);
        }
      }
    };
  }, [pageDescription, pageImage, pageKeywords, pageTitle, pageUrl]);

  // Merchandise items data - these will need actual images
  const merchItems = [
    {
      id: 1,
      name: "Hoodies",
      color: "Beige",
      image:
        "https://res.cloudinary.com/dlpcuxx7y/image/upload/v1760526278/hoodies_cream_b8jz8f.webp",
      alt: "AISOC Cream Hoodie",
    },
    {
      id: 2,
      name: "T Shirts",
      color: "Black",
      image:
        "https://res.cloudinary.com/dlpcuxx7y/image/upload/v1760526279/T-shirts_black_f8smam.webp",
      alt: "AISOC Black T-Shirt",
    },
    {
      id: 3,
      name: "Crewnecks",
      color: "Beige",
      image:
        "https://res.cloudinary.com/dlpcuxx7y/image/upload/v1760526274/crewnecks_cream_vobfqc.webp",
      alt: "AISOC Cream Crewneck",
    },
    {
      id: 4,
      name: "Hoodies",
      color: "Black",
      image:
        "https://res.cloudinary.com/dlpcuxx7y/image/upload/v1760526273/hoodies_black_ry2ojv.webp",
      alt: "AISOC Black Hoodie",
    },
    {
      id: 5,
      name: "T Shirts",
      color: "Beige",
      image:
        "https://res.cloudinary.com/dlpcuxx7y/image/upload/v1760526279/T-shirts_cream_uu0nni.webp",
      alt: "AISOC Cream T-Shirt",
    },
    {
      id: 6,
      name: "Crewnecks",
      color: "Black",
      image:
        "https://res.cloudinary.com/dlpcuxx7y/image/upload/v1760526271/crewnecks_black_m1pn65.webp",
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
          <MerchNavBar
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
          />

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
              component="h1"
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
              src="https://res.cloudinary.com/dlpcuxx7y/image/upload/v1760694826/group-photo_zbydap.webp"
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
        <Box
          sx={{ display: { xs: "block", md: "none" }, padding: "16px", backgroundColor: "#efefef" }}
        >
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
                  <Box
                    key={cell.id}
                    sx={{ gridColumn: "1 / -1", position: "relative", overflow: "hidden" }}
                  >
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
                <Box
                  key={cell.id}
                  sx={{
                    position: "relative",
                    height: "210px",
                    overflow: "hidden",
                    backgroundColor: isLight ? "#d3cfc5" : "#3a3a3a",
                  }}
                >
                  {/* Placeholder center content */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={"/temp-merch-group-photo.png"}
                      alt={cell.label}
                      style={{
                        width: "120%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: isLight ? 0.4 : 0.25,
                      }}
                    />
                  </Box>
                  <Box sx={{ position: "absolute", left: "10px", bottom: "10px" }}>
                    <Typography
                      sx={{
                        color: isLight ? "#4b4b4b" : "#ffffff",
                        fontSize: "14px",
                        fontWeight: 600,
                        fontFamily: "SF Pro Display, Helvetica, sans-serif",
                      }}
                    >
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
          <Box
            sx={{
              maxWidth: "1400px",
              margin: "0 auto",
              "& .slick-list": { margin: "0 -5px" },
              "& .slick-slide > div": { padding: "0 5px" },
            }}
          >
            <Slider {...sliderSettings}>
              {merchItems.map((item) => (
                <RouterLink to="/shop" style={{ textDecoration: "none" }} key={item.id}>
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
                    {/* Lazy loaded merch image with solid color placeholder */}
                    <LazyImage
                      src={item.image}
                      alt={item.alt}
                      width="100%"
                      height="100%"
                      placeholderColor={item.color === "Beige" ? "#d3cfc5" : "#3a3a3a"}
                      objectFit="cover"
                    />

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
                </RouterLink>
              ))}
            </Slider>
          </Box>
        </Box>
        <Footer onLightBackground={true} />
      </Box>
    </>
  );
};

export default Merch;
