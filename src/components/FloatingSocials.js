import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import SocialMediaIcons from "../util/Icons";

export default function FloatingSocials() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("footer-socials");
    if (!footer) return;

    let lastState = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 👇 prevent rapid toggling
        if (entry.isIntersecting !== lastState) {
          lastState = entry.isIntersecting;
          setHide(entry.isIntersecting);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        right: 8,
        top: "50%",
        zIndex: 99999,

        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "14px",

        // 👇 ONLY animate what matters
        opacity: hide ? 0 : 1,
        transform: hide
          ? "translateY(-50%) translateX(40px)"
          : "translateY(-50%) translateX(0)",

        pointerEvents: hide ? "none" : "auto",

        // 👇 FIXED: no "all"
        transition: "opacity 0.4s ease, transform 0.4s ease",

        "& svg": {
          color: "#ffffff",
          transition: "transform 0.2s ease, filter 0.2s ease",
        },

        "& svg:hover": {
          transform: "scale(1.15)",
          filter: "drop-shadow(0 0 10px rgba(255,255,255,0.9))",
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <SocialMediaIcons direction="column" />
      </motion.div>
    </Box>
  );
}