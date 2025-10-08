import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Link as RouterLink } from "react-router-dom";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import { products } from "../util/productData";

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
        {products.slice(0, 3).map((product, index) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <Box
              sx={{
                position: "absolute",
                left: `${175 + index * 304}px`,
                top: "242px",
                width: "265px",
                height: "375px",
                cursor: "pointer",
              }}
            >
              <img
                src={product.mainImage}
                alt={product.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "50% 50%",
                }}
              />
            </Box>
          </Link>
        ))}

        {/* Product Images - Row 2 */}
        {products.slice(3, 6).map((product, index) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <Box
              sx={{
                position: "absolute",
                left: `${175 + index * 304}px`,
                top: "701px",
                width: "265px",
                height: "375px",
                cursor: "pointer",
              }}
            >
              <img
                src={product.mainImage}
                alt={product.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "50% 50%",
                }}
              />
            </Box>
          </Link>
        ))}

        {/* Product Info - Row 1 */}
        {products.slice(0, 3).map((product, index) => (
          <Box
            key={product.id}
            sx={{
              position: "absolute",
              left: `${175 + index * 304}px`,
              top: index === 0 ? "633px" : "629px",
              width: "267px",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontFamily: "Helvetica Neue",
                fontWeight: 500,
                color: "rgba(0,0,0,0.66)",
                marginBottom: "4px",
              }}
            >
              {product.category}
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
              {product.productType}
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
              $ {product.price}
            </Typography>
          </Box>
        ))}

        {/* Product Info - Row 2 */}
        {products.slice(3, 6).map((product, index) => (
          <Box
            key={product.id}
            sx={{
              position: "absolute",
              left: `${175 + index * 304}px`,
              top: index === 2 ? "1088px" : "1092px",
              width: "267px",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontFamily: "Helvetica Neue",
                fontWeight: 500,
                color: "rgba(0,0,0,0.66)",
                marginBottom: "4px",
              }}
            >
              {product.category}
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
              {product.productType}
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
              $ {product.price}
            </Typography>
          </Box>
        ))}
      </Box>
      <Footer />
    </>
  );
};

export default Shop;
