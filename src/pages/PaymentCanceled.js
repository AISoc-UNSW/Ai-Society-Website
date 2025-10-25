import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import MerchNavBar from "../components/MerchNavBar";
import MerchFooter from "../components/MerchFooter";

const PaymentCanceled = () => {
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
          <MerchNavBar items={[{ label: "Home", to: "/merch" }, { label: "Payment Canceled" }]} />

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
            <CancelOutlinedIcon
              sx={{
                fontSize: 120,
                color: "#f44336",
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: 28, md: 36 },
                fontWeight: 700,
                color: "#323232",
              }}
            >
              Payment Canceled
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 16, md: 18 },
                color: "#666",
                lineHeight: 1.7,
                maxWidth: 450,
              }}
            >
              Your payment was canceled. No charges have been made to your account. Your cart items
              have been saved for you.
            </Typography>
            <Typography
              sx={{
                mt: 2,
                fontSize: 14,
                color: "#999",
              }}
            >
              Feel free to return to your cart and try again when you're ready.
            </Typography>

            <Box
              sx={{ display: "flex", gap: 2, mt: 3, flexDirection: { xs: "column", sm: "row" } }}
            >
              <Button
                component={RouterLink}
                to="/cart"
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
                Return to Cart
              </Button>
              <Button
                component={RouterLink}
                to="/shop"
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
                Continue Shopping
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <MerchFooter onLightBackground={true} />
    </>
  );
};

export default PaymentCanceled;
