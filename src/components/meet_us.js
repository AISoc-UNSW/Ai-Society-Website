import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Reveal from "../util/Reveal";
import michael from "../assets/execs/michael.webp";
import samin from "../assets/execs/samin.webp";
import aaron from "../assets/execs/Aaron.webp";

const MeetUs = () => {
    const team = [
        {
            name: "Andrew",
            image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_640.png",
            role: "President",
        },
        {
            name: "Samin",
            image: samin,
            role: "Secretary",
        },
        {
            name: "Ray",
            image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_640.png",
            role: "Treasurer",
        },
        {
            name: "Michael",
            image: michael,
            role: "Arc Delegate",
        },
        {
            name: "Darren",
            image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_640.png",
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
                    padding: "5vh 0",
                    textAlign: "center",
                    backgroundColor: "#110c29",
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
                                    <TeamMember
                                        name={person.name}
                                        image={person.image}
                                        role={person.role}
                                    />
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

export default MeetUs;
