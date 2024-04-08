import React, { useState } from "react";
import { Box, Button } from "@mui/material";

const Events = () => {
    const images = [
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/350",
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/450",
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <Box>
            <Box display="flex" justifyContent="center">
                <img
                    src={images[currentImageIndex]}
                    alt={`Event ${currentImageIndex}`}
                />
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={goToPreviousImage}
                >
                    Previous
                </Button>
                <Box mx={1} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={goToNextImage}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default Events;
