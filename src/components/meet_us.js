import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const MeetUs = () => {
    const team = [
        {
            name: "Andrew",
            image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_640.png",
            role: "President",
        },
        {
            name: "Samin",
            image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_640.png",
            role: "Secretary",
        },
        {
            name: "Ray",
            image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_640.png",
            role: "Treasurer",
        },
        {
            name: "Michael",
            image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_640.png",
            role: "Arc Delegate",
        },
        {
            name: "Darren",
            image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_640.png",
            role: "Grievance Officer",
        },
        {
            name: "Aaron",
            image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_640.png",
            role: "VP of Education",
        },
    ];

    return (
        <Box id="section1" sx={{ margin: "20px 0", textAlign: "center" }}>
            <Typography>Innovate</Typography>
            <Typography
                sx={{ fontWeight: "bold", margin: "15px 0" }}
                variant="h4"
            >
                Meet Our Exec Team
            </Typography>
            <Typography sx={{ marginBottom: "40px" }}>
                Get to know the leading members of our society.
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "20px 60px",
                    justifyContent: "space-evenly",
                }}
            >
                {team.map((person, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            flexBasis: "32%",
                            minWidth: "300px",
                            justifyContent: "space-evenly",
                            marginBottom: "30px",
                        }}
                    >
                        <TeamMember
                            name={person.name}
                            image={person.image}
                            role={person.role}
                        />
                    </Box>
                ))}
            </Box>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                We are currently looking for students to join our team
            </Typography>
            <Button
                variant="outlined"
                href="/join"
                sx={{
                    margin: "15px 0px",
                    color: "black",
                    borderColor: "black",
                    "&:hover": {
                        backgroundColor: "#B9B7BD",
                        borderColor: "black",
                    },
                }}
            >
                Join Here
            </Button>
        </Box>
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
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        objectFit: "cover",
    },
    name: {
        marginTop: theme.spacing(1),
    },
    role: {
        color: theme.palette.text.secondary,
    },
}));

const TeamMember = ({ name, image, role }) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <img src={image} alt={name} className={classes.image} />
            <Typography variant="h6" className={classes.name}>
                {name}
            </Typography>
            <Typography variant="body2" className={classes.role}>
                {role}
            </Typography>
        </Box>
    );
};

export default MeetUs;
// const styles = {
//     container: {
//         position: "relative",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "98vh", // Set container height to full viewport height
//         width: "98vw",
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//         margin: "10px",
//     },
//     header: {
//         fontSize: "24px",
//         marginBottom: "20px",
//         position: "absolute",
//     },
//     profiles: {
//         // display: "flex",
//         // flexWrap: "wrap",
//         // justifyContent: "center",
//         // gap: "20px",
//     },
// };
//  DRAGGING COMPONENTS STUFF <- SCRAPPED FOR NOW
//   const containerRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(null);
//   const [startY, setStartY] = useState(null);
//   const [translateX, setTranslateX] = useState(0);
//   const [translateY, setTranslateY] = useState(0);
//   const [containerWidth, setContainerWidth] = useState(0);
//   const [containerHeight, setContainerHeight] = useState(0);
//   const handleMouseDown = (event) => {
//     setIsDragging(true);
//     setStartX(event.clientX);
//     setStartY(event.clientY);
//   };
//   const handleMouseMove = (event) => {
//     if (!isDragging) return;
//     const deltaX = event.clientX - startX;
//     const deltaY = event.clientY - startY;
//     setTranslateX((prevTranslateX) => prevTranslateX + deltaX);
//     setTranslateY((prevTranslateY) => prevTranslateY + deltaY);
//     setStartX(event.clientX);
//     setStartY(event.clientY);
//   };
//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };
//   const handleResize = () => {
//     const { clientWidth, clientHeight } = containerRef.current;
//     setContainerWidth(clientWidth);
//     setContainerHeight(clientHeight);
//   };
//   // Listen to resize events to update container dimensions
//   React.useEffect(() => {
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   // Looping effect for X axis
//   React.useEffect(() => {
//     const loopX = () => {
//       if (containerWidth !== 0) {
//         if (translateX > containerWidth) {
//           console.log(containerWidth);
//           setTranslateX(0);
//         } else if (translateX < 0) {
//           setTranslateX(containerWidth - 70);
//         }
//       }
//     };
//     const interval = setInterval(loopX, 100);
//     return () => clearInterval(interval);
//   }, [containerWidth, translateX]);
//   // Looping effect for Y axis
//   React.useEffect(() => {
//     const loopY = () => {
//       if (containerHeight !== 0) {
//         if (translateY > containerHeight) {
//           setTranslateY(0);
//         } else if (translateY < 0) {
//           setTranslateY(containerHeight - 40);
//         }
//       }
//     };
//     const interval = setInterval(loopY, 100);
//     return () => clearInterval(interval);
//   }, [containerHeight, translateY]);
//   return (
//     <div
//       ref={containerRef}
//       style={{
//         width: "99vw",
//         height: "99vh",
//         margin: "2px",
//         border: "2px solid black",
//         overflow: "hidden",
//         position: "relative",
//       }}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onMouseLeave={handleMouseUp}
//     >
//       <div
//         style={{
//           width: "fit-content",
//           height: "fit-content",
//           display: "flex",
//           flexDirection: "column",
//           transform: `translate(${translateX}px, ${translateY}px)`,
//           //   transition: "transform 0.1s ease-out",
//           position: "absolute",
//         }}
//       >
//         <div style={{ margin: "10px", backgroundColor: "lightblue" }}>
//           Item 1
//         </div>
//       </div>
//     </div>
//   );

{
    /* <h2 style={styles.header}>Meet the Team</h2>
            <Box style={styles.profiles}>
                <Profile
                    imageUrl={
                        "https://cdn.discordapp.com/emojis/1210125145101041685.gif?size=96&quality=lossless"
                    }
                    description={"this is capoo 1"}
                    x={100}
                    y={100}
                />
                <Profile
                    imageUrl={
                        "https://cdn.discordapp.com/emojis/1154952884119670844.gif?size=128&quality=lossless"
                    }
                    description={"this is capoo2"}
                    x={200}
                    y={200}
                />
                <Profile
                    imageUrl={
                        "https://cdn.discordapp.com/emojis/876294478640594974.gif?size=512"
                    }
                    description={"this is capoo3"}
                    x={400}
                    y={100}
                />
                <Profile
                    imageUrl={
                        "https://cdn.discordapp.com/emojis/1142664037910454283.gif?size=96&quality=lossless"
                    }
                    description={"this is capoo4"}
                    x={600}
                    y={830}
                />
            </Box> */
}
