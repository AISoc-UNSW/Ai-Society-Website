import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
// Product images from Figma
const imgAaa000471 = "https://www.figma.com/api/mcp/asset/4a460ff1-c809-451b-bf0a-c02727b847e1";
const imgAaa000651 = "https://www.figma.com/api/mcp/asset/0b85a4e8-d661-496e-b9f2-80c3e3dfa698";
const imgAaa001131 = "https://www.figma.com/api/mcp/asset/47d7480d-329b-4603-8899-e5a348628d81";
const imgAaa000191 = "https://www.figma.com/api/mcp/asset/7e09b62e-5124-47ca-ad0b-e3e837bf10bd";
const imgAaa000831 = "https://www.figma.com/api/mcp/asset/324947ea-814b-4e9d-a7ca-61b681966410";
const imgAaa001351 = "https://www.figma.com/api/mcp/asset/928df764-4b0d-412f-96c1-f27cc50cfbbc";

const Shop = () => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Set body background to match page background
    document.body.style.backgroundColor = "#efefef";

    // Cleanup: restore original background when component unmounts
    return () => {
      document.body.style.backgroundColor = "black";
    };
  }, []);

  // Shop products data with exact Figma images
  const shopProducts = [
    {
      id: 1,
      name: "Bone",
      productType: "Basic Slim Fit T-Shirt",
      price: "$ 199",
      image: imgAaa000471,
      alt: "AISOC Bone T-Shirt",
    },
    {
      id: 2,
      name: "Bone",
      productType: "Basic Slim Fit T-Shirt",
      price: "$ 199",
      image: imgAaa000651,
      alt: "AISOC Black T-Shirt",
    },
    {
      id: 3,
      name: "Bone",
      productType: "Basic Slim Fit T-Shirt",
      price: "$ 199",
      image: imgAaa001131,
      alt: "AISOC Bone Crewneck",
    },
    {
      id: 4,
      name: "Bone",
      productType: "Basic Slim Fit T-Shirt",
      price: "$ 199",
      image: imgAaa000191,
      alt: "AISOC Black Hoodie",
    },
    {
      id: 5,
      name: "Bone",
      productType: "Basic Slim Fit T-Shirt",
      price: "$ 199",
      image: imgAaa000831,
      alt: "AISOC Bone T-Shirt",
    },
    {
      id: 6,
      name: "Bone",
      productType: "Basic Slim Fit T-Shirt",
      price: "$ 199",
      image: imgAaa001351,
      alt: "AISOC Black Hoodie",
    },
  ];

  return (
    <>
      <LoadingScreen twoSeconds={false} isLoading={isLoading} />
      <Box
        sx={{
          backgroundColor: "#efefef",
          position: "relative",
          width: "1280px",
          height: "1395px",
          margin: "0 auto",
        }}
      >
        {/* Navigation - Home */}
        <RouterLink
          to="/home"
          style={{
            position: "absolute",
            left: "138px",
            top: "56px",
            textDecoration: "none",
            color: "#000",
            fontSize: "20px",
            fontFamily: "Helvetica",
            fontWeight: 300,
            lineHeight: "normal",
            cursor: "pointer",
          }}
        >
          Home
        </RouterLink>

        {/* Navigation - Cart */}
        <Typography
          sx={{
            position: "absolute",
            right: "211px",
            top: "56px",
            fontSize: "20px",
            fontFamily: "Helvetica",
            fontWeight: 300,
            color: "#000",
            lineHeight: "normal",
          }}
        >
          Cart
        </Typography>

        {/* Main Title - SHOP */}
        <Typography
          sx={{
            position: "absolute",
            left: "50%",
            top: "155px",
            transform: "translateX(-50%)",
            fontSize: "20px",
            fontFamily: "Helvetica Neue",
            fontWeight: "bold",
            color: "#000",
            letterSpacing: "1px",
            textTransform: "uppercase",
            lineHeight: "normal",
          }}
        >
          SHOP
        </Typography>

        {/* Product Images - Row 1 */}
        <Box
          sx={{
            position: "absolute",
            left: "175px",
            top: "242px",
            width: "265px",
            height: "375px",
          }}
        >
          <img
            src={imgAaa000471}
            alt="Product 1"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
            }}
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            left: "479px",
            top: "242px",
            width: "265px",
            height: "375px",
          }}
        >
          <img
            src={imgAaa000651}
            alt="Product 2"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
            }}
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            left: "785px",
            top: "242px",
            width: "265px",
            height: "375px",
            cursor: "pointer",
          }}
        >
          <img
            src={imgAaa001131}
            alt="Product 3"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
            }}
          />
        </Box>

        {/* Product Images - Row 2 */}
        <Box
          sx={{
            position: "absolute",
            left: "175px",
            top: "701px",
            width: "265px",
            height: "375px",
          }}
        >
          <img
            src={imgAaa000191}
            alt="Product 4"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
            }}
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            left: "479px",
            top: "701px",
            width: "265px",
            height: "375px",
          }}
        >
          <img
            src={imgAaa000831}
            alt="Product 5"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
            }}
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            left: "785px",
            top: "701px",
            width: "265px",
            height: "375px",
          }}
        >
          <img
            src={imgAaa001351}
            alt="Product 6"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
            }}
          />
        </Box>

        {/* Product Info - Row 1 */}
        <Box sx={{ position: "absolute", left: "175px", top: "633px", width: "267px" }}>
          <Typography
            sx={{
              fontSize: "12px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "rgba(0,0,0,0.66)",
              marginBottom: "4px",
            }}
          >
            Bone
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "#000",
              textTransform: "capitalize",
              marginBottom: "4px",
            }}
          >
            Basic Slim Fit T-Shirt
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              right: "0px",
              top: "21.03px",
              fontSize: "14px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "#000",
            }}
          >
            $ 199
          </Typography>
        </Box>

        <Box sx={{ position: "absolute", left: "479px", top: "629px", width: "267px" }}>
          <Typography
            sx={{
              fontSize: "12px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "rgba(0,0,0,0.66)",
              marginBottom: "4px",
            }}
          >
            Bone
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "#000",
              textTransform: "capitalize",
              marginBottom: "4px",
            }}
          >
            Basic Slim Fit T-Shirt
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              right: "0px",
              top: "21.03px",
              fontSize: "14px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "#000",
            }}
          >
            $ 199
          </Typography>
        </Box>

        <Box sx={{ position: "absolute", left: "785px", top: "629px", width: "267px" }}>
          <Typography
            sx={{
              fontSize: "12px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "rgba(0,0,0,0.66)",
              marginBottom: "4px",
            }}
          >
            Bone
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "#000",
              textTransform: "capitalize",
              marginBottom: "4px",
            }}
          >
            Basic Slim Fit T-Shirt
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              right: "0px",
              top: "21.03px",
              fontSize: "14px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "#000",
            }}
          >
            $ 199
          </Typography>
        </Box>

        {/* Product Info - Row 2 */}
        <Box sx={{ position: "absolute", left: "175px", top: "1092px", width: "267px" }}>
          <Typography
            sx={{
              fontSize: "12px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "rgba(0,0,0,0.66)",
              marginBottom: "4px",
            }}
          >
            Bone
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "#000",
              textTransform: "capitalize",
              marginBottom: "4px",
            }}
          >
            Basic Slim Fit T-Shirt
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              right: "0px",
              top: "21.03px",
              fontSize: "14px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "#000",
            }}
          >
            $ 199
          </Typography>
        </Box>

        <Box sx={{ position: "absolute", left: "479px", top: "1092px", width: "267px" }}>
          <Typography
            sx={{
              fontSize: "12px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "rgba(0,0,0,0.66)",
              marginBottom: "4px",
            }}
          >
            Bone
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "#000",
              textTransform: "capitalize",
              marginBottom: "4px",
            }}
          >
            Basic Slim Fit T-Shirt
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              right: "0px",
              top: "21.03px",
              fontSize: "14px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "#000",
            }}
          >
            $ 199
          </Typography>
        </Box>

        <Box sx={{ position: "absolute", left: "785px", top: "1088px", width: "267px" }}>
          <Typography
            sx={{
              fontSize: "12px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "rgba(0,0,0,0.66)",
              marginBottom: "4px",
            }}
          >
            Bone
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "#000",
              textTransform: "capitalize",
              marginBottom: "4px",
            }}
          >
            Basic Slim Fit T-Shirt
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              right: "0px",
              top: "21.03px",
              fontSize: "14px",
              fontFamily: "Helvetica Neue",
              fontWeight: 500,
              color: "#000",
            }}
          >
            $ 199
          </Typography>
        </Box>

      </Box>
      <Footer />
    </>
  );
};

export default Shop;
