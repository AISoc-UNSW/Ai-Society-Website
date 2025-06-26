import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import img19 from "../assets/watchtower/19.webp";
import img20 from "../assets/watchtower/20.webp";
import img23 from "../assets/watchtower/23.webp";
import img28 from "../assets/watchtower/28.webp";
import img29 from "../assets/watchtower/29.webp";
import img30 from "../assets/watchtower/30.webp";
import img32 from "../assets/watchtower/32.webp";
import Slider from "react-slick";
import Reveal from "../util/Reveal";
import { Link } from "@mui/material";

// TODO: get api from newsletter website to dynamically get this info
const cardData = [
  {
    title: "Google Strikes Back: Veo 3, Gemini 2.5, and the IO Offensive",
    author: "By AI Society Education Team",
    date: "June 05, 2025",
    img: img32,
    link: "https://aisocthewatchtower.beehiiv.com/p/the-turing-point-32nd-edition",
  },
  {
    title: "Rise of Autonomous Agents and a Huge Week for Open Source",
    author: "By AI Society Education Team",
    date: "March 29, 2025",
    img: img30,
    link: "https://aisocthewatchtower.beehiiv.com/p/the-turing-point-30th-edition",
  },
  {
    title: "Grok 3, Claude 3.7, and GPT-4.5: The AI Titans Redefining Intelligence",
    author: "By AI Society Education Team",
    date: "March 08, 2025",
    img: img29,
    link: "https://aisocthewatchtower.beehiiv.com/p/the-turing-point-29th-edition",
  },
  {
    title: "2024: The Year AI Took Center Stage (Recap Edition)",
    author: "By AI Society Education Team",
    date: "February 13, 2025",
    img: img28,
    link: "https://aisocthewatchtower.beehiiv.com/p/the-watchtower-28th-edition-2024-recap",
  },
  {
    title: "YOLOv10",
    author: "By AI Society Education Team",
    date: "July 29, 2024",
    img: img23,
    link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-23rd-edition",
  },
  {
    title: "How Physics Is Revolutionizing AI Image Generation",
    author: "By Ziming Gong",
    date: "July 08 2024",
    img: img20,
    link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-20th-edition",
  },
  {
    title: "The Bitter Lesson - Computation over Cognition",
    author: "By Jonas Macken",
    date: "July 01 2024",
    img: img19,
    link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-19th-edition",
  },
];

function handleClick() {
  window.location.href = "https://aisocthewatchtower.beehiiv.com";
}

const NewsLetter = () => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 800,
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
        id="newsletter"
        sx={{
          textAlign: "center",
          padding: "5% 10% 5% 10%",
          // backgroundColor: "#19123e",
          color: "white",
        }}
      >
        <Reveal>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              margin: "0 10vw",
              fontFamily: "Ubuntu Sans",
              marginBottom: "15px",
            }}
          >
            The Turing Point Newsletter
          </Typography>
          <Typography
            gutterBottom
            sx={{
              margin: "0 10vw",
              fontFamily: "Ubuntu Sans",
              marginBottom: "15px",
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            Explore the recent and upcoming AI news, products and research
          </Typography>
          <Box sx={{ marginLeft: "3vw", marginRight: "2vw" }}>
            <Slider {...settings}>
              {cardData.map((card, index) => (
                <Link href={card.link} underline="none">
                  <Card
                    sx={{
                      marginRight: "1vw",
                      height: "430px",
                      backgroundColor: "#1a1a1a", // Darker shade of gray for the card background
                      color: "#f2f2f2", // Light gray text for better contrast
                      "&:hover": {
                        backgroundColor: "#2c2c2c", // Slightly lighter shade of gray on hover
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Add a subtle shadow on hover
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={card.title}
                      height={{ xs: "70vh" }}
                      image={card.img}
                      sx={{
                        maxHeight: "60%",
                        objectFit: "cover",
                        filter: "brightness(0.9)", // Slightly reduce the brightness of the image
                      }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        fontWeight="bold"
                        component="div"
                        sx={{ color: "#f2f2f2" }} // Light gray text for the title
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#b2b2b2" }} // Medium gray text for the author
                      >
                        {card.author}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#8c8c8c" }} // Light gray text for the date
                      >
                        {card.date}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </Slider>
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
              marginTop: "40px",
              "&:hover": {
                backgroundColor: "#1d1740",
                borderColor: "white",
              },
            }}
          >
            Read More
          </Button>
        </Reveal>
      </Box>
    </>
  );
};

export default NewsLetter;
