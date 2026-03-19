import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

const rotations = [-6, 4, -3, 6, -2];

export default function PhotoStack({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [moving, setMoving] = useState(false);

  const handleClick = () => {
    if (moving) return;

    setMoving(true);

    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
      setMoving(false);
    }, 350);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: "relative",
        width: { xs: "100%", md: 290 },
        height: { xs: 280, md: 400 },
        maxWidth: 420,
        cursor: "pointer",
      }}
    >
      {images.map((item, i) => {
        const index = (i - activeIndex + images.length) % images.length;
        const isTop = index === 0;

        return (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",

              transition: "transform 0.45s ease, opacity 0.35s ease",

              transform: isTop
                ? moving
                  ? "translateY(-20px) rotate(6deg) scale(0.97)"
                  : "rotate(0deg)"
                : `rotate(${rotations[index]}deg) translateY(${index * 10}px)`,

              zIndex: images.length - index,
              pointerEvents: isTop ? "auto" : "none",
            }}
          >
            {/* POLAROID FRAME */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f5f5f2",
                borderRadius: "6px",
                padding: "12px 12px 20px 12px",
                boxShadow: isTop ? "0 12px 30px rgba(0,0,0,0.4)" : "0 6px 15px rgba(0,0,0,0.25)",
                filter: isTop ? "none" : `brightness(${1 - index * 0.05})`,
              }}
            >
              {/* IMAGE */}
              <Box
                component="img"
                src={item.src}
                sx={{
                  width: "100%",
                  height: "80%",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />

              {/* CAPTION */}
              <Typography
                sx={{
                  marginTop: "10px",
                  textAlign: "center",
                  fontFamily: "Permanent Marker",
                  fontSize: "30px",
                  color: "#222",
                }}
              >
                {item.caption}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}