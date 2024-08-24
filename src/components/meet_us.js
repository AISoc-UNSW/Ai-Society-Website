import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Reveal from "../util/Reveal";
import michael from "../assets/execs/michael.webp";
import samin from "../assets/execs/samin.webp";
import aaron from "../assets/execs/Aaron.webp";
import darren from "../assets/execs/darren.webp";
import aee from "../assets/execs/easter-egg.webp";
import ree from "../assets/execs/easter-egg2.webp";
import andrew from "../assets/execs/andrew.webp";
import ray from "../assets/execs/ray.webp";

const MeetUs = () => {
  const team = [
    {
      name: "Andrew",
      image: andrew,
      role: "President",
    },
    {
      name: "Samin",
      image: samin,
      role: "Secretary",
    },
    {
      name: "Ray",
      image: ray,
      role: "Treasurer",
    },
    {
      name: "Michael",
      image: michael,
      role: "Arc Delegate",
    },
    {
      name: "Darren",
      image: darren,
      role: "Grievance Officer",
    },
    {
      name: "Aaron",
      image: aaron,
      role: "VP of Education",
    },
  ];

  return (
    <>
      <Box
        id="team"
        sx={{
          padding: "5% 10% 5% 10%",
          textAlign: "center",
          // backgroundColor: "#110c29",
          color: "white",
        }}
      >
        <Reveal>
          <Typography
            sx={{
              fontWeight: "bold",
              margin: "15px 0",
              fontFamily: "Ubuntu Sans",
            }}
            variant="h3"
          >
            Meet Our Exec Team
          </Typography>
          <Typography
            sx={{
              marginBottom: "40px",
              fontFamily: "Ubuntu Sans",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            Get to know the leading members of our society.
          </Typography>

          <Grid container spacing={2}>
            {team.map((person, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    marginBottom: "30px",
                  }}
                >
                  {person.name === "Andrew" || "Ray" ? (
                    <Egg
                      name={person.name}
                      image={person.image}
                      role={person.role}
                    />
                  ) : (
                    <TeamMember
                      name={person.name}
                      image={person.image}
                      role={person.role}
                    />
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>

          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              fontFamily: "Ubuntu Sans",
              marginBottom: "15px",
            }}
          >
            We are currently looking for students to join our team
          </Typography>
          <Button
            variant="outlined"
            component="a"
            href="https://docs.google.com/forms/d/e/1FAIpQLSej9Lb9_XwBtBbQEtk4shBCgPfaTSugmm8PZOq6zI3MCy7mXQ/viewform?usp=sf_link"
            sx={{
              color: "white",
              fontWeight: "bold",
              borderColor: "white",
              fontFamily: "Ubuntu Sans",
              fontSize: "18px",
              "&:hover": {
                backgroundColor: "#1d1740",
                borderColor: "white",
              },
            }}
          >
            JOIN HERE
          </Button>
        </Reveal>
      </Box>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  image: {
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  name: {
    marginTop: theme.spacing(1),
  },
  role: {
    color: "rgba(256,256,256, 0.6)",
  },
}));

const TeamMember = ({ name, image, role }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <img src={image} alt={name} className={classes.image} />
      <Typography
        variant="h6"
        className={classes.name}
        sx={{ fontFamily: "Ubuntu Sans" }}
      >
        {name}
      </Typography>
      <Typography
        variant="body2"
        className={classes.role}
        sx={{ fontFamily: "Ubuntu Sans" }}
      >
        {role}
      </Typography>
    </Box>
  );
};

const Egg = ({ name, image, role }) => {
  const classes = useStyles();
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(null);
  const [currentImage, setCurrentImage] = useState(image);

  useEffect(() => {
    if (clickCount === 10) {
      setCurrentImage(name === "Andrew" ? aee : ree);
    }
  }, [clickCount, name]);

  const handleImageClick = () => {
    const currentTime = new Date().getTime();
    if (lastClickTime && currentTime - lastClickTime > 3000) {
      setClickCount(1);
    } else {
      setClickCount((prevCount) => prevCount + 1);
    }
    setLastClickTime(currentTime);
  };

  return (
    <Box className={classes.root}>
      <img
        src={currentImage}
        alt={name}
        className={classes.image}
        onClick={handleImageClick}
      />
      <Typography
        variant="h6"
        className={classes.name}
        sx={{ fontFamily: "Ubuntu Sans" }}
      >
        {name}
      </Typography>
      <Typography
        variant="body2"
        className={classes.role}
        sx={{ fontFamily: "Ubuntu Sans" }}
      >
        {role}
      </Typography>
    </Box>
  );
};

export default MeetUs;
