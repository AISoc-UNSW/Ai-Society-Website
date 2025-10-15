import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import Footer from "../components/Footer";
import LazyImage from "../components/LazyImage";
import LoadingScreen from "../components/LoadingScreen";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5008";
    const url = `${API_BASE}/api/products/${id}`;

    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(url, { signal: abortController.signal });
        if (!res.ok) throw new Error(`Failed to load product: ${res.status}`);
        const data = await res.json();
        // Expecting a single product document in Mongo shape
        setProduct(data);
        const defaultSize =
          Array.isArray(data?.sizes) && data.sizes.length > 0 ? data.sizes[0] : null;
        const defaultColor =
          Array.isArray(data?.colours) && data.colours.length > 0 ? data.colours[0] : null;
        setSelectedSize(defaultSize);
        setSelectedColor(defaultColor);
        const firstImg = Array.isArray(data?.imgs) && data.imgs.length > 0 ? data.imgs[0] : null;
        setMainImage(firstImg);
      } catch (e) {
        // In case of error, keep product null so UI shows not found
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
    return () => abortController.abort();
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
          <RouterLink
            to="/merch"
            style={{
              textDecoration: "none",
              color: "black",
              position: "absolute",
              top: 0,
              left: 100,
            }}
          >
            <Typography variant="h6">Home</Typography>
          </RouterLink>
          <RouterLink
            to="/cart"
            style={{
              textDecoration: "none",
              color: "black",
              position: "absolute",
              top: 0,
              right: 100,
            }}
          >
            <Typography variant="h6">Cart</Typography>
          </RouterLink>

          {/* Image Gallery */}
          <Box sx={{ width: "617px", mt: 10 }}>
            <Box sx={{ mb: 2, width: "617px", height: "864px" }}>
              <LazyImage
                src={mainImage}
                alt="product"
                width="100%"
                height="100%"
                objectFit="cover"
                placeholderColor="#d9d9d9"
              />
            </Box>
            <Box sx={{ display: "flex", gap: "10px" }}>
              {(product.imgs || []).map((img, index) => (
                <Box
                  key={index}
                  sx={{ cursor: "pointer", width: "153px", height: "156px" }}
                  onClick={() => setMainImage(img)}
                >
                  <LazyImage
                    src={img}
                    alt={`thumbnail ${index}`}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    placeholderColor="#e6e6e6"
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Product Info */}
          <Box sx={{ width: "40%", mt: 10, ml: 5, position: "relative", pb: 10 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {product.name}
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
              Colour:
            </Typography>
            <Box sx={{ display: "flex", gap: "10px", mb: 3 }}>
              {(product.colours || []).map((color) => (
                <Box
                  key={color}
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor: color,
                    cursor: "pointer",
                    border: selectedColor === color ? "3px solid #000" : "1px solid #000",
                  }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </Box>

            <Typography variant="body1" sx={{ mb: 1 }}>
              Size:
            </Typography>
            <Box sx={{ display: "flex", gap: "10px", mb: "50px" }}>
              {(product.sizes || []).map((size) => (
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
                    "&:hover": {
                      backgroundColor: selectedSize === size ? "black" : "#C0C0C0",
                      boxShadow: "none",
                    },
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
                "&:hover": {
                  opacity: 0.7,
                },
              }}
            >
              What is my size?
            </Typography>

            <Typography variant="h5" sx={{ mb: 3 }}>
              {(() => {
                const price = (function extractPrice(price) {
                  if (price == null) return null;
                  if (typeof price === "number") return price;
                  if (typeof price === "string") {
                    const parsed = parseFloat(price);
                    return Number.isNaN(parsed) ? null : parsed;
                  }
                  if (typeof price === "object") {
                    if (price.$numberDecimal != null) {
                      const parsed = parseFloat(price.$numberDecimal);
                      return Number.isNaN(parsed) ? null : parsed;
                    }
                    if (price.$numberInt != null) {
                      const parsed = parseInt(price.$numberInt, 10);
                      return Number.isNaN(parsed) ? null : parsed;
                    }
                  }
                  return null;
                })(product.price);
                return price != null ? `$ ${price.toFixed(2)}` : "";
              })()}
            </Typography>

            <Button
              variant="contained"
              onClick={() => {
                if (!product?._id) return;
                // Default to first options if none selected
                const colour =
                  selectedColor || (Array.isArray(product?.colours) && product.colours[0]);
                const size = selectedSize || (Array.isArray(product?.sizes) && product.sizes[0]);
                dispatch(addToCart({ id: product._id, colour, size, quantity: 1 }));
              }}
              sx={{
                backgroundColor: "#323232",
                color: "white",
                width: "452px",
                height: "105px",
                borderRadius: "17px",
                fontSize: "16px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#404040",
                },
              }}
            >
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
                "&:hover": {
                  opacity: 0.7,
                },
              }}
            >
              More details
            </Typography>
          </Box>
        </Box>
      </Box>
      <Footer onLightBackground={true} />
    </>
  );
};

export default ProductDetail;
