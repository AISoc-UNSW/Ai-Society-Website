import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Button } from "@mui/material";
import Reveal from "../util/Reveal";
import defaultEvent from "../assets/coming-soon.webp";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";

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

const Events = () => {

  const classes = useCarouselStyles();

  const [imageData, setImageData] = useState([
    {
      src: defaultEvent,
      alt: "AI Society Events",
      link: "https://campus.hellorubric.com/?s=12437",
      title: "AI Society Events",
      date: "",
      time: ""
    }
  ]);

  useEffect(() => {

    const loadEvents = async () => {

      try {

        const snapshot = await getDocs(collection(db, "events"));

        const events = snapshot.docs.map(doc => doc.data());

        if (!events.length) return;

        const now = new Date();

        const upcomingEvents = events
          .map(event => ({
            ...event,
            eventDate: new Date(`${event.date}T${event.time}`)
          }))
          .filter(event => event.eventDate >= now)
          .sort((a, b) => a.eventDate - b.eventDate);

        if (!upcomingEvents.length) return;

        const formatted = upcomingEvents.map(event => ({
          src: event.image,
          alt: event.title,
          link: event.link,
          title: event.title,
          date: new Date(event.date).toLocaleDateString("en-AU", {
            day: "numeric",
            month: "short",
            year: "numeric"
          }),
          time: event.time
        }));

        setImageData(formatted);

      } catch (err) {

        console.error("Failed to load events:", err);

      }

    };

    loadEvents();

  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
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
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >

                  <a
                    href={image.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      textDecoration: "none"
                    }}
                  >

                    <Box
                      sx={{
                        position: "relative",
                        "&:hover .overlay": {
                          opacity: 1
                        },
                        "&:hover .caption": {
                          opacity: 0
                        }
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
                          cursor: "pointer"
                        }}
                      />

                      {/* Hover overlay */}
                      <Box
                        className="overlay"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background: "rgba(0,0,0,0.65)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          color: "white",
                          opacity: 0,
                          transition: "opacity 0.25s ease"
                        }}
                      >

                        <Typography
                          sx={{
                            fontFamily: "Ubuntu Sans",
                            fontWeight: "bold",
                            fontSize: "18px"
                          }}
                        >
                          {image.title}
                        </Typography>

                        <Typography
                          sx={{
                            fontFamily: "Ubuntu Sans",
                            fontSize: "15px"
                          }}
                        >
                          {image.date} • {image.time}
                        </Typography>

                      </Box>

                    </Box>

                  </a>

                  {/* Caption below image */}
                  <Box
                    className="caption"
                    sx={{
                      marginTop: "8px",
                      textAlign: "center",
                      transition: "opacity 0.25s ease"
                    }}
                  >

                    <Typography
                      sx={{
                        fontFamily: "Ubuntu Sans",
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "white"
                      }}
                    >
                      {image.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontFamily: "Ubuntu Sans",
                        fontSize: "14px",
                        color: "white"
                      }}
                    >
                      {image.date} • {image.time}
                    </Typography>

                  </Box>

                </Box>
              ))}
            </Slider>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              marginTop: "40px",
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
              View Our Events
            </Button>
          </Box>

        </Reveal>
      </Box>
    </>
  );
};

export default Events;