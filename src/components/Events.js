import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Reveal from "../util/Reveal";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5008";

const useCarouselStyles = makeStyles({
  dotContainer: {
    "& .slick-dots": {
      "& li": {
        marginRight: "45px",
        "&:last-child": { marginRight: 0 },
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
            "&:before": { backgroundColor: "#fff" },
          },
        },
      },
    },
  },
});

const Events = () => {
  const classes = useCarouselStyles();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
    <Box
      id="events"
      sx={{ padding: "5% 10% 5% 10%", color: "white" }}
    >
      <Reveal>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", marginBottom: "15px", fontFamily: "Ubuntu Sans" }}
          >
            Discover
          </Typography>
          <Typography
            gutterBottom
            sx={{ marginBottom: "15px", fontFamily: "Ubuntu Sans", fontSize: "20px", color: "rgba(255, 255, 255, 0.8)" }}
          >
            Stay updated with the latest events, lectures, and meetings related to artificial intelligence.
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress sx={{ color: "white" }} />
          </Box>
        ) : events.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography sx={{ color: "rgba(255,255,255,0.6)", fontFamily: "Ubuntu Sans", fontSize: "18px", mb: 3 }}>
              No upcoming events right now — check back soon!
            </Typography>
            <Button
              variant="outlined"
              href="https://rubric.org.au/aisoc"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "white",
                borderColor: "white",
                fontFamily: "Ubuntu Sans",
                fontSize: "16px",
                "&:hover": { backgroundColor: "#1d1740", borderColor: "white" },
              }}
            >
              View Events on Rubric
            </Button>
          </Box>
        ) : (
          <Box sx={{ margin: "0 5vw" }}>
            <Slider {...settings}>
              {events.map((event) => (
                <Box
                  key={event._id}
                  component="a"
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ display: "block", textDecoration: "none" }}
                >
                  <img
                    src={event.photo}
                    alt={event.title}
                    style={{
                      margin: "0 auto",
                      maxWidth: "100%",
                      height: "auto",
                      maxHeight: "40vh",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                  <Typography
                    sx={{
                      textAlign: "center",
                      mt: 2,
                      fontFamily: "Ubuntu Sans",
                      fontSize: "18px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {event.title}
                  </Typography>
                  {event.description && (
                    <Typography
                      sx={{
                        textAlign: "center",
                        mt: 1,
                        fontFamily: "Ubuntu Sans",
                        fontSize: "15px",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {event.description}
                    </Typography>
                  )}
                </Box>
              ))}
            </Slider>
          </Box>
        )}
      </Reveal>
    </Box>
  );
};

export default Events;