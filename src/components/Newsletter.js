import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import gpt from "../assets/gptstore.png";

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
    // Add more card data here for additional cards
];

const NewsLetter = () => {
    return (
        <Box
            id="newsletter"
            sx={{
                textAlign: "center",
                marginTop: "30px",
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
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                }}
            >
                {cardData.map((card, index) => (
                    <Box
                        key={index}
                        sx={{
                            maxWidth: 400,
                            width: { xs: "100%", sm: "60%", md: "30%" },
                        }}
                    >
                        <Card>
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
            </Box>
        </Box>
    );
};

export default NewsLetter;
