import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import gpt from "../assets/gptstore.png";
import Slider from "react-slick";

// TODO: get api from newsletter website to dynamically get this info
const cardData = [
    {
        title: "The WatchTower: 12th Edition",
        author: "By Jonas Macken, Lucy, David Hung & Ziming Gong",
        date: "April 08, 2024",
        img: gpt,
        link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-12th-edition",
    },
    {
        title: "The WatchTower: 12th Edition",
        author: "By Jonas Macken, Lucy, David Hung & Ziming Gong",
        date: "April 08, 2024",
        img: gpt,
        link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-12th-edition",
    },
    {
        title: "The WatchTower: 12th Edition",
        author: "By Jonas Macken, Lucy, David Hung & Ziming Gong",
        date: "April 08, 2024",
        img: gpt,
        link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-12th-edition",
    },
    {
        title: "The WatchTower: 12th Edition",
        author: "By Jonas Macken, Lucy, David Hung & Ziming Gong",
        date: "April 08, 2024",
        img: gpt,
        link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-12th-edition",
    },
    {
        title: "The WatchTower: 12th Edition",
        author: "By Jonas Macken, Lucy, David Hung & Ziming Gong",
        date: "April 08, 2024",
        img: gpt,
        link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-12th-edition",
    },
    // Add more card data here for additional cards
];

const NewsLetter = () => {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        initialSlide: 0,
        centerPadding: "30px",
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
                    marginTop: "5vh",
                    marginBottom: "10vh",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", margin: "0 10vw" }}
                >
                    The Watchtower Newsletter
                </Typography>
                <Typography gutterBottom sx={{ margin: "0 10vw" }}>
                    Explore the recent and upcoming AI news
                </Typography>
                <Box sx={{ marginLeft: "30px", marginRight: "20px" }}>
                    <Slider {...settings}>
                        {cardData.map((card) => (
                            <Box>
                                {/* This box is needed so that marginRight will work on the card (don't know why tho, something to do with the slider). */}
                                <Card sx={{ marginRight: "10px" }}>
                                    <CardMedia
                                        component="img"
                                        alt={card.title}
                                        height="450"
                                        image={card.img}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            fontWeight="bold"
                                            component="div"
                                        >
                                            {card.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            {card.author}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {card.date}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" href={card.link}>
                                            Read More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Box>
                        ))}
                    </Slider>
                </Box>
            </Box>
        </>
    );
};

export default NewsLetter;
