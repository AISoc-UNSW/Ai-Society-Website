import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const SizeGuideModal = ({ open, onClose, sizeData }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="size-guide-title"
      aria-describedby="size-guide-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "90%",
          maxWidth: "600px",
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
          outline: "none",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography
          id="size-guide-title"
          variant="h5"
          component="h2"
          sx={{
            mb: 3,
            fontWeight: "bold",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Unisex sizing guide
        </Typography>

        {/* Size Table */}
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 400 }} aria-label="size guide table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                    textTransform: "uppercase",
                  }}
                >
                  MEASUREMENT
                </TableCell>
                {sizeData.map((item) => (
                  <TableCell
                    key={item.size}
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.size}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Body Width Row */}
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: "medium" }}>
                  Body Width (cm)
                </TableCell>
                {sizeData.map((item) => (
                  <TableCell key={`${item.size}-width`} align="center">
                    {item.bodyWidth}
                  </TableCell>
                ))}
              </TableRow>
              {/* Body Length Row */}
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: "medium" }}>
                  Body Length (cm)
                </TableCell>
                {sizeData.map((item) => (
                  <TableCell key={`${item.size}-length`} align="center">
                    {item.bodyLength}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Disclaimer */}
        <Typography
          variant="body2"
          sx={{
            mt: 3,
            color: "grey.600",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Please note measurements can vary within 2.5cm, this is within our tolerance.
        </Typography>
      </Box>
    </Modal>
  );
};

export default SizeGuideModal;
