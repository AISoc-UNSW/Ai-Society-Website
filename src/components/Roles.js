import React, { useState, useEffect } from "react";
import { Box, Typography, Collapse } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const portfolios = [
    "Human Resources",
    "Public Relations",
    "Industry",
    "Information Technology",
    "Events",
];

const portfolio_description = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et leo ac magna pellentesque facilisis et a est. Donec ac odio tempor magna fringilla efficitur et sit amet neque. In sapien nibh, fringilla eu sem eu, fermentum porttitor sapien. Morbi eu dui suscipit, convallis enim eu, efficitur mauris. Mauris tincidunt mollis magna eget mollis. Aenean porta venenatis semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam eros lacus, semper eu efficitur id, malesuada et diam. Etiam ullamcorper vehicula nisl. Duis sit amet ipsum vel lectus pharetra rhoncus id ac odio. Vivamus tincidunt magna id eros tempus porttitor. Morbi efficitur sapien ac justo lacinia, eu scelerisque nunc dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Aenean ultricies ut mauris ac sollicitudin. Suspendisse ac ante convallis, semper justo ac, egestas felis.",
    "Proin pharetra diam in aliquam dapibus. Nullam metus velit, dapibus nec consequat tristique, tincidunt rutrum orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus suscipit efficitur lorem, at tempus augue commodo et. Aenean tempor interdum diam, eu maximus elit efficitur non. Praesent suscipit mollis interdum. Aliquam bibendum velit vel velit porta, sit amet sollicitudin elit elementum. Phasellus vulputate lacus non nibh ornare, et elementum turpis ullamcorper. Aenean ac dui vel orci cursus varius quis ac elit. Nullam in mi fermentum, vestibulum urna vitae, congue lectus. Phasellus ullamcorper euismod nibh vel commodo. Ut nunc leo, luctus ut facilisis eu, auctor quis est. In vulputate mollis metus, dictum maximus metus facilisis iaculis. Proin non ex purus. Aenean vel fermentum leo, sed accumsan neque. Nulla ligula diam, facilisis a ullamcorper aliquam, volutpat sit amet magna.",
    "Fusce feugiat tortor non efficitur molestie. Nulla facilisi. Aliquam erat volutpat. Quisque ante libero, facilisis a purus sed, ornare tempus libero. Integer risus ligula, efficitur a ornare at, tristique non nisi. Donec maximus, arcu sit amet dictum pretium, turpis libero ullamcorper purus, ac vulputate nisl tortor quis dolor. Suspendisse ex urna, tempor in leo ornare, luctus tincidunt orci. Nulla tempus enim non augue rhoncus, a mattis metus placerat. Proin sapien dolor, porttitor at posuere sed, scelerisque quis ligula. Phasellus pretium pharetra sodales.",
    "Praesent pellentesque ullamcorper sem sit amet lacinia. Fusce lacinia tristique vulputate. Nam sit amet lorem ut ipsum facilisis aliquam vitae vel quam. Sed id vestibulum nibh. Vestibulum vestibulum purus at euismod porta. Nullam sit amet mauris turpis. Cras ultricies ex eget malesuada lacinia.",
    "Aenean molestie eleifend metus non accumsan. Nam neque elit, pellentesque et arcu ut, feugiat finibus enim. Donec dapibus nunc ante, sit amet varius urna molestie id. Etiam interdum ligula feugiat varius accumsan. Praesent faucibus quis sem at suscipit. Quisque ac odio in erat facilisis vulputate in id lacus. Etiam venenatis vehicula neque eu tincidunt. Sed eget tincidunt tellus, a venenatis felis. Fusce a risus semper, porttitor odio sit amet, maximus urna. Sed scelerisque enim vel sollicitudin semper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam felis ex, mattis finibus eleifend congue, aliquam sed enim.",
];

const TypingAnimation = ({ text }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let currentIndex = -1;
        const typingSpeed = 3; // typing speed
        let timeoutId; // keep track of the timeout ID

        const typeNextCharacter = () => {
            if (currentIndex < text.length - 1) {
                setDisplayedText((prevText) => prevText + text[currentIndex]);
                currentIndex++;
                timeoutId = setTimeout(typeNextCharacter, typingSpeed); // save the timeout ID
            }
        };

        setDisplayedText(""); // Clear displayed text when text changes
        typeNextCharacter();

        return () => clearTimeout(timeoutId); // clear the timeout when the text changes
    }, [text]);

    return <Typography>{displayedText}</Typography>;
};

const Roles = () => {
    const [portfolio, setPortfolio] = React.useState("");
    const [portfolioDescription, setPortfolioDescription] = React.useState("");

    const handleChange = (event) => {
        setPortfolio(event.target.value);
        const index = portfolios.indexOf(event.target.value);
        console.log(index);
        console.log(portfolios[index]);
        setPortfolioDescription(portfolio_description[index]);
    };

    return (
        <Box
            sx={{
                margin: "30px",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                Join the Team
            </Typography>
            <Typography sx={{ textAlign: "left", marginBottom: "30px" }}>
                Are you seeking a vibrant and inclusive student developer
                community to join? We're constantly on the lookout for
                passionate and imaginative students to join our ranks, eager to
                learn and collaborate in enhancing university life for all. Take
                the first step towards getting involved by clicking the links
                below today!
            </Typography>
            <FormControl sx={{ width: "300px", marginBottom: "30px" }}>
                <InputLabel id="portfolio-select-label">
                    Select Portfolio
                </InputLabel>
                <Select
                    labelId="portfolio-select-label"
                    id="portfolio-select"
                    value={portfolio}
                    label="Select Portfolio"
                    onChange={handleChange}
                >
                    {portfolios.map((portfolioItem, index) => (
                        <MenuItem key={index} value={portfolioItem}>
                            {portfolioItem}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Collapse timeout={900} in={portfolio !== ""}>
                <Box
                    sx={{
                        border: "1px solid black",
                        borderRadius: "10px",
                        textAlign: "left",
                        padding: "10px",
                        minHeight: "100px",
                    }}
                >
                    <Typography sx={{ fontWeight: "bold" }}>
                        Role Description
                    </Typography>
                    <TypingAnimation text={portfolioDescription} />
                </Box>
            </Collapse>
        </Box>
    );
};

export default Roles;
