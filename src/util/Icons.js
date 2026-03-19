import { Facebook, Instagram, GitHub, LinkedIn } from "@mui/icons-material";
import { ReactComponent as DiscordIcon } from "../assets/discord-icon.svg";
import { Box } from "@mui/material";

const IconWithHover = ({ icon, link }) => {
  return (
    <Box
      sx={{
        marginRight: "5px", // Add some margin between icons
        transition: "transform 0.2s", // Add transition for smooth hover effect
        "& svg": {
          color: "#ffffff",
          transition: "all 0.4s ease",
        },

        "& svg:hover": {
          transform: "scale(1.15)",
        },
      }}
      onClick={() => window.open(link, "_blank")}
    >
      {icon}
    </Box>
  );
};

const SocialMediaIcons = ({direction = "row"}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: direction,
        marginBottom: "5px",
        paddingBottom: "10px",
      }}
    >
      <IconWithHover
        icon={<Instagram sx={{ fontSize: 35 }} />}
        link="https://www.instagram.com/aisocunsw/"
      />
      <IconWithHover
        icon={<Facebook sx={{ fontSize: 35 }} />}
        link="https://www.facebook.com/profile.php?id=100092595608038"
      />
      <IconWithHover
        icon={<GitHub sx={{ fontSize: 35 }} />}
        link="https://github.com/AISoc-UNSW"
      />
      <IconWithHover
        icon={<LinkedIn sx={{ fontSize: 35 }} />}
        link="https://www.linkedin.com/company/unsw-artificial-intelligence-society/"
      />
      <IconWithHover
        icon={<DiscordIcon style={{ width: "35px", height: "35px" }} />}
        link="https://discord.gg/856FnEQePJ"
      />
    </Box>
  );
};

export default SocialMediaIcons;
