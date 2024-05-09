import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import gpt from "../assets/gptstore.webp";
import Slider from "react-slick";
import { makeStyles } from "@material-ui/core/styles";
import Reveal from "../util/Reveal";

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
        title: "The WatchTower: 11th Edition",
        author: "By Shetal & Andrew Suryanto",
        date: "January 30, 2024",
        img: gpt,
        link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-11th-edition",
    },
    {
        title: "The WatchTower: 10th Edition",
        author: "By Shetal & Andrew Suryanto",
        date: "December 25, 2023",
        img: gpt,
        link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-10th-edition",
    },
    {
        title: "The WatchTower: 9th Edition",
        author: "By Solomon, Andrew Suryanto & Shetal",
        date: "November 14, 2023",
        img: gpt,
        link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-9th-edition",
    },
    {
        title: "The WatchTower: 8th Edition",
        author: "By Li Li, Solomon & Andrew Suryanto",
        date: "October 30, 2023",
        img: gpt,
        link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-8th-edition",
    },
    {
        title: "The WatchTower: 7th Edition",
        author: "By Li Li, Solomon & Andrew Suryanto",
        date: "September 28, 2023",
        img: gpt,
        link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-7th-edition",
    },
    // 6th Edition
    {
        title: "The WatchTower: 6th Edition",
        author: "By Li Li, Solomon & Andrew Suryanto",
        date: "September 15, 2023",
        img: gpt,
        link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-6th-edition",
    },
    // 5th Edition
    {
        title: "The WatchTower: 5th Edition",
        author: "By Andrew Suryanto",
        date: "Sept 05 2023",
        img: gpt,
        link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-5th-edition",
    },
    // 4th Edition
    {
        title: "The WatchTower: 4th Edition",
        author: "By Solomon",
        date: "August 22 2023",
        img: gpt,
        link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-4th-edition",
    },
    // 3rd Edition
    {
        title: "The WatchTower: 3rd Edition",
        author: "By Li Li, Midjourney V-5 & Solomon Na Muangtoun",
        date: "August 15, 2023",
        img: gpt,
        link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-3rd-edition",
    },
    // 2nd Edition
    {
        title: "The WatchTower: 2nd Edition",
        author: "By Li Li, Solomon Na Muangtoun & Midjourney V-5",
        date: "August 07, 2023",
        img: gpt,
        link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-2nd-edition",
    },
    // 1st Edition
    {
        title: "The WatchTower: 1st Edition",
        author: "By Midjourney V-5, GPT-4 & Li Li",
        date: "July 31, 2023",
        img: gpt,
        link: "https://aisocthewatchtower.beehiiv.com/p/watchtower-1st-edition",
    },
    // Add more card data here for additional cards
];

const useCarouselStyles = makeStyles({
    dotContainer: {
        "& .slick-dots": {
            "& li": {
                marginRight: "10px", // Adjust the spacing between dots
                "&:last-child": {
                    marginRight: 0,
                },
                "& button": {
                    "&:before": {
                        content: '""',
                        width: "12px", // Adjust the size of the dots
                        height: "12px",
                        borderRadius: "50%", // Make the dots circular
                        backgroundColor: "rgba(255, 255, 255, 0.4)", // Gray color for inactive dots
                    },
                },
                "&.slick-active": {
                    "& button": {
                        "&:before": {
                            backgroundColor: "#fff", // White color for active dot
                        },
                    },
                },
            },
        },
    },
});

const NewsLetter = () => {
    const classes = useCarouselStyles();
    var settings = {
        dots: true,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        initialSlide: 0,
        centerPadding: "30px",
        className: classes.dotContainer,
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
                    paddingTop: "5vh",
                    paddingBottom: "10vh",
                    backgroundColor: "#19123e",
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
                        The Watchtower Newsletter
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
                        Explore the recent and upcoming AI news
                    </Typography>
                    <Box sx={{ marginLeft: "3vw", marginRight: "2vw" }}>
                        <Slider {...settings}>
                            {cardData.map((card, index) => (
                                <Box key={index}>
                                    {/* This box is needed so that marginRight will work on the card (don't know why tho, something to do with the slider). */}
                                    <Card
                                        sx={{
                                            marginRight: "1vw",
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            alt={card.title}
                                            height={{ xs: "70vh" }}
                                            image={card.img}
                                            sx={{ maxHeight: "450px" }}
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
                                            <Button
                                                size="small"
                                                href={card.link}
                                                sx={{ color: "blue" }}
                                            >
                                                Read More
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Box>
                            ))}
                        </Slider>
                    </Box>
                </Reveal>
            </Box>
        </>
    );
};

export default NewsLetter;
