import { Box, Typography, useTheme, useMediaQuery, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MerchFooter from "../components/MerchFooter";
import LoadingScreen from "../components/LoadingScreen";
import MerchNavBar from "../components/MerchNavBar";

const Shop = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    // Set body background to match page background
    document.body.style.backgroundColor = "#efefef";

    // Cleanup: restore original background when component unmounts
    return () => {
      document.body.style.backgroundColor = "black";
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5008";
    const url = `${API_BASE}/api/products`;

    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(url, { signal: abortController.signal });
        if (!res.ok) throw new Error(`Failed to load products: ${res.status}`);
        const data = await res.json();
        // Expecting an array of products in Mongo shape
        const activeProducts = Array.isArray(data)
          ? data.filter((p) => !p.status || p.status === "active")
          : [];
        setProducts(activeProducts);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load products");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
    return () => abortController.abort();
  }, []);

  function extractPrice(price) {
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
  }

  return (
    <>
      <LoadingScreen twoSeconds={false} isLoading={isLoading} />
      {/* Outer wrapper to ensure proper background and centering */}
      <Box
        sx={{
          backgroundColor: "#efefef",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: {
            xs: "0 20px", // Mobile: minimum side margins
            sm: "0 24px", // Small tablets: slightly more margins
            md: "0 32px", // Medium screens: more margins
            lg: "0 40px", // Large screens: generous margins
            xl: "0 60px", // Extra large: maximum margins
          },
          boxSizing: "border-box",
        }}
      >
        {/* Inner content container */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1280px",
            // Inner padding for content
            padding: {
              xs: "20px 4px", // Mobile: minimal inner padding
              sm: "30px 8px", // Small tablets: small inner padding
              md: "40px 16px", // Medium screens: more inner padding
              lg: "40px 20px", // Large screens: generous inner padding
              xl: "40px 20px", // Extra large: consistent inner padding
            },
            position: "relative",
            boxSizing: "border-box",
          }}
        >
          {/* Navigation Header */}
          <MerchNavBar
            sx={{
              marginBottom: isMobile ? "40px" : "60px",
              paddingTop: isMobile ? "20px" : "16px",
            }}
            items={[
              {
                label: "Home",
                to: "/merch",
              },
              {
                label: "Cart",
                to: "/cart",
              },
            ]}
          />

          {/* Main Title */}
          <Typography
            sx={{
              textAlign: "center",
              fontSize: isMobile ? "18px" : "20px",
              fontFamily: "Helvetica Neue",
              fontWeight: "bold",
              color: "#000",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: isMobile ? "40px" : "60px",
            }}
          >
            SHOP
          </Typography>

          {/* Products Grid */}
          <Grid
            container
            spacing={{
              xs: 2, // Mobile: smaller spacing
              sm: 3, // Small tablets: medium spacing
              md: 4, // Desktop: larger spacing
            }}
            sx={{
              // Additional container padding for better spacing
              paddingX: {
                xs: 0, // Mobile: no extra padding (rely on main container)
                sm: 1, // Small tablets: small extra padding
                md: 2, // Desktop: more padding
              },
            }}
          >
            {error && <Typography sx={{ color: "#b00020", px: 2 }}>{error}</Typography>}
            {products.map((product) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={product._id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {/* Product Image */}
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio: "265/375", // Maintain original aspect ratio
                      marginBottom: "16px",
                      cursor: "pointer",
                      overflow: "hidden",
                      borderRadius: "4px",
                    }}
                  >
                    <img
                      src={product.imgs && product.imgs.length > 0 ? product.imgs[0] : undefined}
                      alt={product.name || "product"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "50% 50%",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = "scale(1.05)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = "scale(1)";
                      }}
                    />
                  </Box>

                  {/* Product Info */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: isMobile ? "11px" : "12px",
                        fontFamily: "Helvetica Neue",
                        fontWeight: 500,
                        color: "rgba(0,0,0,0.66)",
                      }}
                    >
                      {product.colour}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: isMobile ? "13px" : "14px",
                          fontFamily: "Helvetica Neue",
                          fontWeight: 500,
                          color: "#000",
                          textTransform: "capitalize",
                          flex: 1,
                          marginRight: "8px",
                        }}
                      >
                        {product.name}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: isMobile ? "13px" : "14px",
                          fontFamily: "Helvetica Neue",
                          fontWeight: 500,
                          color: "#000",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {(() => {
                          const price = extractPrice(product.price);
                          return price != null ? `$ ${price.toFixed(2)}` : "";
                        })()}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <MerchFooter onLightBackground={true} />
    </>
  );
};

export default Shop;
