import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material";
import Reveal from "../util/Reveal";
import defaultEvent from "../assets/coming-soon.webp";

import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../firebase/firebaseconfig";
import { resolveEventImage } from "../admin/adminUtils";

const fallbackEvents = [
  {
    src: defaultEvent,
    alt: "AI Society Events",
    link: "https://campus.hellorubric.com/?s=12437",
    title: "AI Society Events",
    date: "",
    time: ""
  }
];

const Events = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const railRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageData, setImageData] = useState(fallbackEvents);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "events"));

        const events = await Promise.all(
          snapshot.docs.map(async (snapshotDoc) => {
            const event = {
              docId: snapshotDoc.id,
              ...snapshotDoc.data()
            };

            return {
              ...event,
              image: await resolveEventImage(event, storage)
            };
          })
        );

        if (!events.length) {
          return;
        }

        const now = new Date();

        const upcomingEvents = events
          .map((event) => ({
            ...event,
            eventDate: new Date(`${event.date}T${event.time || "00:00"}`)
          }))
          .filter((event) => event.eventDate >= now)
          .sort((a, b) => a.eventDate - b.eventDate);

        if (!upcomingEvents.length) {
          return;
        }

        const formattedEvents = upcomingEvents.map((event) => ({
          src: event.image || defaultEvent,
          alt: event.title || "AI Society event",
          link: event.link || "https://campus.hellorubric.com/?s=12437",
          title: event.title || "Upcoming Event",
          date: event.date
            ? new Date(event.date).toLocaleDateString("en-AU", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })
            : "",
          time: event.time || ""
        }));

        setImageData(formattedEvents);
        setActiveIndex(0);
      } catch (error) {
        console.error("Failed to load events:", error);
      }
    };

    loadEvents();
  }, []);

  const hasMultipleEvents = imageData.length > 1;

  useEffect(() => {
    if (!hasMultipleEvents) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % imageData.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [hasMultipleEvents, imageData.length]);

  useEffect(() => {
    if (!hasMultipleEvents || (isDesktop && imageData.length <= 2)) {
      return;
    }

    const rail = railRef.current;
    if (!rail) {
      return;
    }

    const activeCard = rail.querySelector(`[data-event-index="${activeIndex}"]`);
    if (!activeCard) {
      return;
    }

    rail.scrollTo({
      left: activeCard.offsetLeft,
      behavior: "smooth"
    });
  }, [activeIndex, hasMultipleEvents, imageData.length, isDesktop]);

  const useDesktopGrid = isDesktop && imageData.length <= 2;

  const eventCards = useMemo(
    () =>
      imageData.map((image, index) => (
        <Box
          key={`${image.title}-${index}`}
          data-event-index={index}
          sx={{
            flex: useDesktopGrid ? "0 1 420px" : "0 0 min(360px, 82vw)",
            maxWidth: useDesktopGrid ? "420px" : "none",
            scrollSnapAlign: "center"
          }}
        >
          <a
            href={image.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textDecoration: "none"
            }}
          >
            <Box
              sx={{
                borderRadius: "18px",
                overflow: "hidden",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: index === activeIndex
                  ? "1px solid rgba(255,255,255,0.3)"
                  : "1px solid rgba(255,255,255,0.08)",
                transition: "transform 0.25s ease, border-color 0.25s ease",
                transform: index === activeIndex ? "translateY(-4px)" : "translateY(0)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: "rgba(255,255,255,0.3)"
                }
              }}
            >
              <Box
                sx={{
                  aspectRatio: "4 / 4.8",
                  background:
                    "linear-gradient(180deg, rgba(14,14,22,0.96), rgba(9,9,14,0.98))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "18px"
                }}
              >
                <Box
                  component="img"
                  src={image.src}
                  alt={image.alt}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                    borderRadius: "12px"
                  }}
                />
              </Box>

              <Box sx={{ padding: "14px 16px 16px" }}>
                <Typography
                  sx={{
                    fontFamily: "Ubuntu Sans",
                    fontWeight: "bold",
                    fontSize: "17px",
                    color: "white",
                    marginBottom: "6px"
                  }}
                >
                  {image.title}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "Ubuntu Sans",
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.8)"
                  }}
                >
                  {image.date} {image.date && image.time ? "•" : ""} {image.time}
                </Typography>
              </Box>
            </Box>
          </a>
        </Box>
      )),
    [activeIndex, imageData, useDesktopGrid]
  );

  return (
    <Box
      id="events"
      sx={{
        padding: "5% 10% 5% 10%",
        color: "white",
      }}
    >
      <Reveal>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              marginBottom: "15px",
              fontFamily: "Ubuntu Sans",
            }}
          >
            Discover
          </Typography>

          <Typography
            gutterBottom
            sx={{
              marginBottom: "30px",
              fontFamily: "Ubuntu Sans",
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            Stay updated with the latest events, lectures, and meetings
            related to artificial intelligence.
          </Typography>
        </Box>

        <Box sx={{ margin: "0 auto", maxWidth: "1100px" }}>
          <Box
            ref={railRef}
            sx={{
              display: "flex",
              justifyContent: useDesktopGrid ? "center" : hasMultipleEvents ? "flex-start" : "center",
              flexWrap: useDesktopGrid ? "wrap" : "nowrap",
              gap: 2.5,
              overflowX: useDesktopGrid ? "visible" : "auto",
              paddingBottom: 2,
              scrollSnapType: useDesktopGrid ? "none" : "x mandatory",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none"
              }
            }}
          >
            {eventCards}
          </Box>

          {hasMultipleEvents && !useDesktopGrid && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1.25,
                marginTop: 1
              }}
            >
              {imageData.map((_, index) => (
                <Box
                  key={`dot-${index}`}
                  onClick={() => setActiveIndex(index)}
                  sx={{
                    width: index === activeIndex ? "36px" : "10px",
                    height: "10px",
                    borderRadius: "999px",
                    backgroundColor: index === activeIndex
                      ? "#ffffff"
                      : "rgba(255,255,255,0.35)",
                    transition: "all 0.2s ease",
                    cursor: "pointer"
                  }}
                />
              ))}
            </Box>
          )}
        </Box>

        <Box
          sx={{
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          <Button
            variant="contained"
            size="large"
            href="https://campus.hellorubric.com/?s=12437"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontFamily: "Ubuntu Sans",
              fontSize: "18px",
              padding: "12px 30px",
            }}
          >
            View Our Events
          </Button>
        </Box>
      </Reveal>
    </Box>
  );
};

export default Events;
