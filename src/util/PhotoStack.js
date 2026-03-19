import React, { useState } from "react";
import { Box } from "@mui/material";

const rotations = [-6, 4, -3, 6, -2];

export default function PhotoStack({ images }) {
  const [stack, setStack] = useState(images);
  const [moving, setMoving] = useState(false);

  const handleClick = () => {
    if (moving) return;

    setMoving(true);

    setTimeout(() => {
      setStack(prev => {
        const newArr = [...prev];
        const first = newArr.shift();
        newArr.push(first);
        return newArr;
      });

      setMoving(false);
    }, 400);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: "relative",
        width: { xs: "100%", md: 380 },
        height: { xs: 240, md: 260 },
        maxWidth: 400,
        cursor: "pointer",
      }}
    >
      {stack.map((img, index) => {
        const isTop = index === 0;

        return (
          <Box
            key={index}
            component="img"
            src={img}
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: 3,

              transition: "transform 0.45s ease, opacity 0.35s ease",

              transform: isTop
                ? moving
                  ? "translateY(-40px) rotate(10deg) scale(0.9)"
                  : "rotate(0deg)"
                : `rotate(${rotations[index]}deg) translateY(${index * 8}px)`,

              opacity: isTop && moving ? 0.99 : 1,

              zIndex: stack.length - index,
              filter: isTop ? "none" : `brightness(${1 - index * 0.05})`,

              pointerEvents: isTop ? "auto" : "none",

              "&:hover": isTop && !moving
                ? {
                    transform: "translateY(-8px) scale(1.02)",
                  }
                : {},
            }}
          />
        );
      })}
    </Box>
  );
}