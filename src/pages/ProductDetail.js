import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import MerchFooter from "../components/MerchFooter";
import LazyImage from "../components/LazyImage";
import LoadingScreen from "../components/LoadingScreen";
import MerchNavBar from "../components/MerchNavBar";
import SizeGuideModal from "../components/SizeGuideModal";
import { addToCart } from "../store/cartSlice";
import { sizeGuideData } from "../util/sizeData";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // Track 2s timeout for not found fallback
  const [showNotFound, setShowNotFound] = useState(false);
  // Size guide modal state
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Map product colour names to display hex values for the circle indicator
  function mapColourToHex(name) {
    if (!name) return "#D9D9D9";
    const key = String(name).toLowerCase().trim();
    switch (key) {
      case "black":
        return "#000000";
      case "bone":
        return "#E8E6DA"; // off-white/cream tone for bone
      default:
        // Fallback: assume the value is a valid CSS color string
        return name;
    }
  }

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
        setSelectedSize(defaultSize);
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

  useEffect(() => {
    if (product === null && !isLoading) {
      const timer = setTimeout(() => setShowNotFound(true), 2000);
      return () => clearTimeout(timer);
    } else {
      setShowNotFound(false);
    }
  }, [product, isLoading]);

  // Show fallback content after 2s if not found
  if (!product) {
    if (showNotFound) {
      return (
        <Box
          sx={{
            height: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" mb={2}>
            Product not found
          </Typography>
          <Button variant="outlined" component={RouterLink} to="/shop">
            Back to Shop
          </Button>
        </Box>
      );
    }
    return <LoadingScreen isLoading={true} />;
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <>
      <LoadingScreen twoSeconds={false} isLoading={isLoading} />
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
          <MerchNavBar
            sx={{ position: "absolute", top: 0, left: 0, right: 0, px: "100px" }}
            items={[
              { label: "Home", to: "/merch" },
              { label: "Cart", to: "/cart" },
            ]}
          />

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
          <Box
            sx={{
              width: "40%",
              mt: 10,
              ml: 5,
              position: "relative",
              pb: 10,
              textTransform: "capitalize",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2 }}>
              {product.name}
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
              Colour:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 3 }}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor: mapColourToHex(product.colour),
                }}
              />
              <Typography>{product.colour}</Typography>
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
              onClick={() => setSizeGuideOpen(true)}
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
                const colour = product.colour;
                const size = selectedSize || (Array.isArray(product?.sizes) && product.sizes[0]);
                dispatch(addToCart({ id: product._id, colour, size, quantity: 1 }));
                setSnackbarOpen(true);
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

            <Snackbar
              open={snackbarOpen}
              autoHideDuration={2000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
                Added to cart
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Box>

      {/* Size Guide Modal */}
      <SizeGuideModal
        open={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        sizeData={sizeGuideData}
      />

      <MerchFooter onLightBackground={true} />
    </>
  );
};

export default ProductDetail;
