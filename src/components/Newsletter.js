import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import img30 from "../assets/watchtower/30.webp";
import img32 from "../assets/watchtower/32.webp";
import img33 from "../assets/watchtower/33.webp";
import img34 from "../assets/watchtower/34.webp";
import img35 from "../assets/watchtower/35.webp";
import img36 from "../assets/watchtower/36.webp";
import Slider from "react-slick";
import Reveal from "../util/Reveal";
import { Link } from "@mui/material";

const cardData = [
  {
    title: "The Great Data Centre Debate, Anthropic vs. The Pentagon",
    author: "AISociet Education",
    date: "March 17, 2026",
    img: img36,
    link: "https://aisocturingpoint.beehiiv.com/p/the-turing-point-2026-version-three"
  },
  {
    title: "The Death of Saas: A 'whodunnit' with One Suspect",
    author: "AISociety Education",
    date: "March 2, 2026",
    img: img33,
    link: "https://aisocturingpoint.beehiiv.com/p/the-turing-point-2026-version-two",
  },
  {
    title: "Google redfining Mathematics, Global RAM Shortages",
    author: "AISociety Education",
    date: "February 8, 2026",
    img: img35,
    link: "https://aisocturingpoint.beehiiv.com/p/the-turing-point-2026-version-one",
  },
  {
    title: "Entering the new AI Era, The Rise of Meta AI ",
    author: "AISociety Education",
    date: "July 3, 2025",
    img: img34,
    link: "https://aisocturingpoint.beehiiv.com/p/the-turing-point-33rd-edition",
  },
  {
    title: "Google Strikes Back: Veo 3, Gemini 2.5, and the IO Offensive",
    author: "By AI Society Education Team",
    date: "June 05, 2025",
    img: img32,
    link: "https://aisocturingpoint.beehiiv.com/p/the-turing-point-32nd-edition",
  },
  {
    title: "Rise of Autonomous Agents and a Huge Week for Open Source",
    author: "By AI Society Education Team",
    date: "March 29, 2025",
    img: img30,
    link: "https://aisocturingpoint.beehiiv.com/p/the-turing-point-30th-edition",
  },
];

function handleClick() {
  window.location.href = "https://aisocturingpoint.beehiiv.com/";
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
                      backgroundColor: "#1a1a1a", 
                      color: "#f2f2f2", 
                      "&:hover": {
                        backgroundColor: "#2c2c2c", 
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", 
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={card.title}
                      image={card.img}
                      sx={{
                        height: "220px",         
                        width: "100%",
                        objectFit: "cover",       
                        filter: "brightness(0.9)"
                      }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        fontWeight="bold"
                        component="div"
                        sx={{ color: "#f2f2f2" }} 
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#b2b2b2" }} 
                      >
                        {card.author}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#8c8c8c" }} 
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
