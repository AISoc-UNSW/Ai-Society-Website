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
    time: "",
    endTime: ""
  }
];

const Events = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const railRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageData, setImageData] = useState(fallbackEvents);
  const [fallbackState, setFallbackState] = useState("loading");

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
          setFallbackState("empty");
          return;
        }

        const now = new Date();

        const upcomingEvents = events
          .map((event) => ({
            ...event,
            eventDate: new Date(`${event.date}T${event.time || "00:00"}`),
            eventEndDate: new Date(
              `${event.date}T${event.endTime || event.time || "23:59"}`
            )
          }))
          .filter((event) => event.eventEndDate >= now)
          .sort((a, b) => a.eventDate - b.eventDate);

        if (!upcomingEvents.length) {
          setFallbackState("empty");
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
          time: event.time || "",
          endTime: event.endTime || ""
        }));

        setImageData(formattedEvents);
        setActiveIndex(0);
        setFallbackState("ready");
      } catch (error) {
        console.error("Failed to load events:", error);
        setFallbackState("error");
      }
    };

    loadEvents();
  }, []);

  const hasMultipleEvents = imageData.length > 1;
  const useDesktopGrid = false;
  const useDesktopCarousel = false;
  const maxActiveIndex = useDesktopCarousel
    ? imageData.length - 3
    : imageData.length - 1;

  useEffect(() => {
    if (!hasMultipleEvents) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        currentIndex >= maxActiveIndex ? 0 : currentIndex + 1
      );
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [hasMultipleEvents, maxActiveIndex]);

  useEffect(() => {
    if (!hasMultipleEvents || useDesktopGrid || useDesktopCarousel) {
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
  }, [activeIndex, hasMultipleEvents, imageData.length, isDesktop, useDesktopCarousel, useDesktopGrid]);

  const eventCards = useMemo(
    () =>
      imageData.map((image, index) => (
        <Box
          key={`${image.title}-${index}`}
          data-event-index={index}
          sx={{
            display: "flex",
            flex: "0 0 min(360px, 78vw)",
            width: "auto",
            maxWidth: "none",
            minWidth: "auto",
            scrollSnapAlign: { xs: "start", md: "center" }
          }}
        >
          <a
            href={image.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textDecoration: "none",
              width: "100%",
              height: "100%"
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderRadius: "18px",
                overflow: "hidden",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: !useDesktopGrid && !useDesktopCarousel && index === activeIndex
                  ? "1px solid rgba(255,255,255,0.3)"
                  : "1px solid rgba(255,255,255,0.08)",
                transition: "transform 0.25s ease, border-color 0.25s ease",
                transform:
                  !useDesktopGrid && !useDesktopCarousel && index === activeIndex
                    ? "translateY(-4px)"
                    : "translateY(0)",
                "&:hover": {
                  transform: useDesktopGrid ? "translateY(0)" : "translateY(-4px)",
                  borderColor: "rgba(255,255,255,0.3)"
                }
              }}
            >
              <Box
                sx={{
                  height: { xs: "340px", md: "320px" },
                  background:
                    "linear-gradient(180deg, rgba(14,14,22,0.96), rgba(9,9,14,0.98))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: { xs: "16px", md: "14px" }
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
                    maxWidth: { xs: "280px", md: "252px" },
                    maxHeight: { xs: "308px", md: "292px" },
                    borderRadius: "12px"
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                  minHeight: { xs: "auto", md: "92px" },
                  padding: "12px 16px 14px"
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Ubuntu Sans",
                    fontWeight: "bold",
                    fontSize: "17px",
                    color: "white",
                    lineHeight: 1.2,
                    marginBottom: "4px",
                    minHeight: { xs: "auto", md: "42px" }
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
                  {image.date} {image.date ? "\u2022" : ""} {image.endTime ? `${image.time} - ${image.endTime}` : "ALL DAY"}
                </Typography>
              </Box>
            </Box>
          </a>
        </Box>
      )),
    [activeIndex, imageData, useDesktopCarousel, useDesktopGrid]
  );

  return (
    <Box
      id="events"
      sx={{
        paddingTop: "5%",
        paddingBottom: "5%",
        paddingLeft: { xs: "8%", md: "5%" },
        paddingRight: { xs: "8%", md: "5%" },
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

        <Box sx={{ margin: "0 auto", maxWidth: { xs: "1100px", md: "1320px" } }}>
          {fallbackState === "ready" ? (
            <>
              <Box
                ref={railRef}
                sx={{
                  position: "relative",
                  width: "100%",
                  overflowX: "auto",
                  overflowY: "hidden",
                  paddingTop: 1.5,
                  paddingLeft: { xs: 2, md: 0 },
                  paddingRight: { xs: 2, md: 0 },
                  paddingBottom: 2,
                  scrollSnapType: "x mandatory",
                  scrollPaddingLeft: theme.spacing(2),
                  scrollPaddingRight: theme.spacing(2),
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    display: "none"
                  }
                }}
                >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "nowrap",
                    gap: 2.5,
                    width: "max-content"
                  }}
                >
                  {eventCards}
                </Box>
              </Box>

              {hasMultipleEvents && (
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
            </>
          ) : (
            <Box
              sx={{
                maxWidth: "620px",
                margin: "0 auto",
                padding: { xs: "24px", md: "32px" },
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.08)",
                backgroundColor: "rgba(255,255,255,0.04)",
                textAlign: "center"
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Ubuntu Sans",
                  fontWeight: "bold",
                  fontSize: { xs: "24px", md: "30px" },
                  color: "white",
                  marginBottom: "10px"
                }}
              >
                {fallbackState === "error"
                  ? "We couldn\u2019t load events right now."
                  : "No upcoming events just yet."}
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Ubuntu Sans",
                  fontSize: "17px",
                  color: "rgba(255,255,255,0.78)",
                  marginBottom: "24px"
                }}
              >
                {fallbackState === "error"
                  ? "Please try again shortly, or check our events page for the latest updates."
                  : "We\u2019re planning the next AI Society event now. Check our events page for the latest updates."}
              </Typography>

              <Button
                variant="contained"
                size="large"
                href="https://campus.hellorubric.com/?s=12437"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontFamily: "Ubuntu Sans",
                  fontSize: "17px",
                  padding: "12px 26px"
                }}
              >
                View Our Events
              </Button>
            </Box>
          )}
        </Box>

        {fallbackState === "ready" && (
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
        )}
      </Reveal>
    </Box>
  );
};

export default Events;
