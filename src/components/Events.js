import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Button } from "@mui/material";
import Reveal from "../util/Reveal";
import defaultEvent from "../assets/build.webp";
import munchAndMonet from "../assets/mAm.webp"; 

const useCarouselStyles = makeStyles({
  dotContainer: {
    "& .slick-dots": {
      "& li": {
        marginRight: "45px",
        "&:last-child": {
          marginRight: 0,
        },
        "& button": {
          "&:before": {
            content: '""',
            width: "60px",
            height: "5px",
            borderRadius: 0,
            backgroundColor: "rgba(255, 255, 255, .4)",
          },
        },
        "&.slick-active": {
          "& button": {
            "&:before": {
              backgroundColor: "#fff",
            },
          },
        },
      },
    },
  },
});

/*
Future events example:

import hackathon from "../assets/hackathon.webp";

const imageData = [
  { src: hackathon, alt: "AI Hackathon" },
];
*/

const imageData = [
  {
    src: defaultEvent,
    alt: "AI Society Events",
  },
  {
    src: munchAndMonet,
    alt: "Munch and Monet"
  }
];

const Events = () => {
  const classes = useCarouselStyles();

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: true,
    className: classes.dotContainer,
  };

  return (
    <>
      <Box
        id="events"
        sx={{
          padding: "5% 10% 5% 10%",
          color: "white",
        }}
      >
        <Reveal>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                marginBottom: "15px",
                fontFamily: "Ubuntu Sans",
              }}
            >
              Discover
            </Typography>

            <Typography
              gutterBottom
              sx={{
                marginBottom: "30px",
                fontFamily: "Ubuntu Sans",
                fontSize: "20px",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              Stay updated with the latest events, lectures, and meetings
              related to artificial intelligence.
            </Typography>
          </Box>

          <Box sx={{ margin: "0 5vw" }}>
            <Slider {...settings}>
              {imageData.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{
                      margin: "0 auto",
                      maxWidth: "100%",
                      height: "auto",
                      maxHeight: "40vh",
                      objectFit: "contain",
                    }}
                  />

                  {/* Overlay CTA */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      href="https://campus.hellorubric.com/?s=12437"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontFamily: "Ubuntu Sans",
                        fontSize: "18px",
                        padding: "12px 30px",
                      }}
                    >
                      View & Register
                    </Button>
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>
        </Reveal>
      </Box>
    </>
  );
};

export default Events;