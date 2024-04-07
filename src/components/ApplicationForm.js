import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

// Probably gonna scrap this
const ApplicationForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        bio: "",
        yearBorn: "",
        zid: "",
        degree: "",
        major: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <Box sx={{ maxWidth: 400, margin: "auto" }}>
            <Typography
                variant="h4"
                align="left"
                gutterBottom
                sx={{ fontWeight: "bold" }}
            >
                Personal Details
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    required
                />

                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <TextField
                        fullWidth
                        label="Year Born"
                        name="yearBorn"
                        value={formData.yearBorn}
                        onChange={handleChange}
                        margin="normal"
                        required
                        sx={{ flex: "2", marginRight: "1rem" }}
                    />
                    <TextField
                        fullWidth
                        label="ZID"
                        name="zid"
                        value={formData.zid}
                        onChange={handleChange}
                        InputProps={{
                            inputProps: {
                                maxLength: 8,
                            },
                        }}
                        margin="normal"
                        required
                        sx={{ flex: "3" }}
                    />
                </Box>

                <TextField
                    fullWidth
                    label="Degree"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Major"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    margin="normal"
                    required
                />

                <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
            </form>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Submit
            </Button>
        </Box>
    );
};

export default ApplicationForm;
