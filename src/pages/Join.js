import NavBar from "../components/NavBar";
import ApplicationForm from "../components/ApplicationForm";
import Roles from "../components/Roles";
import { Box } from "@mui/material";

function Join() {
    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                // backgroundColor: "#14161b",
            }}
        >
            <Roles />
            {/* <ApplicationForm /> */}
        </Box>
    );
}

export default Join;
