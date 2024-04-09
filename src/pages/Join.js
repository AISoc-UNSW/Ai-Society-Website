// import ApplicationForm from "../components/ApplicationForm";
import Roles from "../components/Roles";
import { Box } from "@mui/material";
import NavBar2 from "../components/NavBar2";
function Join() {
    return (
        <Box
            sx={{
                height: "100vh",
                // backgroundColor: "#14161b",
            }}
        >
            <NavBar2 />
            <Roles />
            {/* <ApplicationForm /> */}
        </Box>
    );
}

export default Join;
