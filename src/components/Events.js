import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@mui/material";
import llm_workshop from "../assets/llm-workshop.webp";
import bbq from "../assets/bbq.webp";
import Reveal from "../util/Reveal";

const useCarouselStyles = makeStyles({
  dotContainer: {
    "& .slick-dots": {
      "& li": {
        marginRight: "45px",
        "&:last-child": {
          marginRight: 0, // Remove the right margin for the last dot
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
const imageData = [
  {
    src: bbq,
    alt: "Image 1",
  },
  {
    src: llm_workshop,
    alt: "Image 2",
  },

  // {
  //     src: "https://cdn.discordapp.com/emojis/876294478640594974.gif?size=512",
  //     alt: "Image 3",
  // },
  // {
  //     src: "https://cdn.discordapp.com/emojis/1142664037910454283.gif?size=96&quality=lossless",
  //     alt: "Image 3",
  // },
  // {
  //     src: "https://cdn.discordapp.com/emojis/1210125145101041685.gif?size=96&quality=lossless",
  //     alt: "Image 3",
  // },
];

const Events = () => {
  const classes = useCarouselStyles();

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    className: classes.dotContainer,
  };

  return (
    <>
      <Box
        id="events"
        sx={{
          padding: "5% 10% 5% 10%",
          // backgroundColor: "#000033",
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
                marginBottom: "15px",
                fontFamily: "Ubuntu Sans",
                fontSize: "20px",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              Stay updated with the latest events, lectures, and meetings
              related to artifical intelligence.
            </Typography>
          </Box>

          <Box
            sx={{
              margin: "0 5vw",
            }}
          >
            <Slider {...settings}>
              {imageData.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 0,
                    // height: "auto",
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
                      objectFit: "contain", // Preserve aspect ratio
                    }}
                  />
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
