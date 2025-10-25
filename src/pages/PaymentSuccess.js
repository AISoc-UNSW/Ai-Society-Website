import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MerchNavBar from "../components/MerchNavBar";
import MerchFooter from "../components/MerchFooter";
import { clearCart } from "../store/cartSlice";

const PaymentSuccess = () => {
  const dispatch = useDispatch();

  // Clear cart on successful payment
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  // Set light background to match the merch section
  useEffect(() => {
    document.body.style.backgroundColor = "#efefef";
    return () => {
      document.body.style.backgroundColor = "black";
    };
  }, []);

  return (
    <>
      <Box sx={{ backgroundColor: "#efefef", minHeight: "100vh", py: 5 }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            px: { xs: 2, sm: 4, md: 8, lg: 12 },
            boxSizing: "border-box",
          }}
        >
          <MerchNavBar
            items={[
              { label: "Home", to: "/merch" },
              { label: "Cart", to: "/cart" },
            ]}
          />

          <Box
            sx={{
              mt: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              py: 8,
              px: 3,
              backgroundColor: "white",
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              maxWidth: 600,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <CheckCircleOutlineIcon
              sx={{
                fontSize: 120,
                color: "#4CAF50",
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: 28, md: 36 },
                fontWeight: 700,
                color: "#323232",
              }}
            >
              Payment Successful!
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 16, md: 18 },
                color: "#666",
                lineHeight: 1.7,
                maxWidth: 450,
              }}
            >
              Thank you for your purchase. You will receive a confirmation email with pickup details
              in 1-2 weeks.
            </Typography>
            <Typography
              sx={{
                mt: 2,
                fontSize: 14,
                color: "#999",
                fontStyle: "italic",
              }}
            >
              Please check your spam folder if you don't see the email in your inbox.
            </Typography>

            <Box
              sx={{ display: "flex", gap: 2, mt: 3, flexDirection: { xs: "column", sm: "row" } }}
            >
              <Button
                component={RouterLink}
                to="/shop"
                variant="contained"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  backgroundColor: "#323232",
                  "&:hover": { backgroundColor: "#404040" },
                }}
              >
                Continue Shopping
              </Button>
              <Button
                component={RouterLink}
                to="/merch"
                variant="outlined"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderColor: "#323232",
                  color: "#323232",
                  "&:hover": { borderColor: "#404040", backgroundColor: "rgba(50,50,50,0.05)" },
                }}
              >
                Back to Home
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <MerchFooter onLightBackground={true} />
    </>
  );
};

export default PaymentSuccess;
