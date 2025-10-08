import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import { products } from "../util/productData";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0]);
      setSelectedColor(foundProduct.colors[0]);
      setMainImage(foundProduct.mainImage);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    // Set body background to match page background
    document.body.style.backgroundColor = "#efefef";

    // Cleanup: restore original background when component unmounts
    return () => {
      document.body.style.backgroundColor = "black";
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen isLoading={true} />;
  }

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <>
      <Box sx={{ backgroundColor: "#efefef", py: 5 }}>
        <Box
          sx={{
            width: "1280px",
            margin: "0 auto",
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            padding: "0 100px",
            boxSizing: "border-box",
          }}
        >
          {/* Header */}
          <RouterLink to="/merch" style={{ textDecoration: 'none', color: 'black', position: 'absolute', top: 0, left: 100 }}>
            <Typography variant="h6">Home</Typography>
          </RouterLink>
          <RouterLink to="/cart" style={{ textDecoration: 'none', color: 'black', position: 'absolute', top: 0, right: 100 }}>
            <Typography variant="h6">Cart</Typography>
          </RouterLink>

          {/* Image Gallery */}
          <Box sx={{ width: "617px", mt: 10 }}>
            <Box sx={{ mb: 2, width: "617px", height: "864px" }}>
              <img src={mainImage} alt="product" style={{ width: "100%", height: "100%", objectFit: 'cover', display: 'block' }} />
            </Box>
            <Box sx={{ display: "flex", gap: "10px" }}>
              {product.galleryImages.map((img, index) => (
                <Box key={index} sx={{ cursor: "pointer", width: "153px", height: "156px" }} onClick={() => setMainImage(img)}>
                  <img src={img} alt={`thumbnail ${index}`} style={{ width: "100%", height: "100%", objectFit: 'cover', display: 'block' }} />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Product Info */}
          <Box sx={{ width: "40%", mt: 10, ml: 5, position: "relative", pb: 10 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>{product.title}</Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>Colour:</Typography>
            <Box sx={{ display: "flex", gap: "10px", mb: 3 }}>
              {product.colors.map((color) => (
                <Box
                  key={color.name}
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor: color.value,
                    cursor: "pointer",
                    border: selectedColor.name === color.name ? "3px solid #000" : "1px solid #000"
                  }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </Box>

            <Typography variant="body1" sx={{ mb: 1 }}>Size:</Typography>
            <Box sx={{ display: "flex", gap: "10px", mb: "50px" }}>
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant="contained"
                  onClick={() => setSelectedSize(size)}
                  sx={{
                    width: "54px",
                    height: "43px",
                    minWidth: "54px",
                    backgroundColor: selectedSize === size ? "black" : "#D9D9D9",
                    color: selectedSize === size ? "white" : "black",
                    border: "none",
                    borderRadius: 0,
                    boxShadow: "none",
                    '&:hover': {
                      backgroundColor: selectedSize === size ? "black" : "#C0C0C0",
                      boxShadow: "none",
                    }
                  }}
                >
                  {size}
                </Button>
              ))}
            </Box>

            <Typography
              sx={{
                position: "absolute",
                right: "118px",
                color: "#000",
                fontSize: "15px",
                fontWeight: 510,
                letterSpacing: "-0.75px",
                textDecoration: "underline",
                cursor: "pointer",
                mb: 3,
                '&:hover': {
                  opacity: 0.7
                }
              }}
            >
              What is my size?
            </Typography>

            <Typography variant="h5" sx={{ mb: 3 }}>$ {product.price}</Typography>

            <Button variant="contained" sx={{
              backgroundColor: "#323232",
              color: "white",
              width: "452px",
              height: "105px",
              borderRadius: "17px",
              fontSize: "16px",
              fontWeight: "bold",
              '&:hover': {
                backgroundColor: "#404040",
              }
            }}>
              ADD TO CART
            </Button>

            {/* More details */}
            <Typography
              sx={{
                position: "absolute",
                bottom: "50px",
                color: "#000",
                fontSize: "24px",
                fontWeight: 500,
                cursor: "pointer",
                '&:hover': {
                  opacity: 0.7
                }
              }}
            >
              More details
            </Typography>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ProductDetail;
