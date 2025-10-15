import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Divider, Typography, Alert } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, selectCartItemsArray, updateQuantity } from "../store/cartSlice";
import LazyImage from "../components/LazyImage";
import Footer from "../components/Footer";

// Helper to normalize price from multiple possible types
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

// Fetch product docs for all ids present in cart
async function fetchProductsByIds(ids, signal) {
  const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5008";
  const results = {};
  for (const id of ids) {
    try {
      const res = await fetch(`${API_BASE}/api/products/${id}`, { signal });
      if (res.ok) {
        const data = await res.json();
        results[id] = data;
      }
    } catch (e) {
      // Rethrow abort so caller can silently ignore it; ignore other per-id errors
      if (e && e.name === "AbortError") {
        throw e;
      }
    }
  }
  return results;
}

const SHIPPING_FLAT = 5; // USD flat rate per cart (per screenshot)

const Cart = () => {
  const items = useSelector(selectCartItemsArray);
  const dispatch = useDispatch();
  const [productsById, setProductsById] = useState({});

  // Ensure page body matches light background like Shop/ProductDetail
  useEffect(() => {
    document.body.style.backgroundColor = "#efefef";
    return () => {
      document.body.style.backgroundColor = "black";
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const ids = Array.from(new Set(items.map((i) => i.id)));
    if (ids.length === 0) {
      setProductsById({});
      // No fetch started; no need to abort in cleanup
      return;
    }
    fetchProductsByIds(ids, abortController.signal)
      .then((map) => setProductsById(map))
      .catch((e) => {
        // Ignore aborts caused by React StrictMode double-invocation or route changes
        if (!e || e.name !== "AbortError") {
          // Optionally log or handle non-abort errors
          // console.error(e);
        }
      })
      .finally(() => {});
    return () => abortController.abort();
  }, [items]);

  const lineItems = useMemo(() => {
    return items.map((ci) => {
      const product = productsById[ci.id];
      const price = extractPrice(product?.price) || 0;
      const name = product?.name || "";
      const imgs = product?.imgs || [];
      const inventory = product?.inventory || [];
      const inventoryEntry = inventory.find(
        (inv) => inv.colour === ci.colour && inv.size === ci.size
      );
      const stock = inventoryEntry
        ? typeof inventoryEntry.stock === "object" && inventoryEntry.stock.$numberInt
          ? parseInt(inventoryEntry.stock.$numberInt, 10)
          : inventoryEntry.stock
        : undefined;
      return {
        ...ci,
        name,
        price,
        img: imgs[0],
        stock,
        amount: price * ci.quantity,
      };
    });
  }, [items, productsById]);

  const subtotal = lineItems.reduce((sum, li) => sum + li.amount, 0);
  const shipping = lineItems.length > 0 ? SHIPPING_FLAT : 0;
  const total = subtotal + shipping;
  const hasStockIssue = lineItems.some((li) => li.stock != null && li.quantity > li.stock);

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
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <RouterLink to="/merch" style={{ textDecoration: "none", color: "black" }}>
              <Typography variant="h6">Home</Typography>
            </RouterLink>
            <Typography variant="h6">Cart</Typography>
          </Box>

          {/* Cart lines */}
          <Box sx={{ mt: 6, display: "flex", flexDirection: "column", gap: 4 }}>
            {lineItems.map((li) => (
              <Box
                key={`${li.id}-${li.colour}-${li.size}`}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                  gap: { xs: 2, sm: 0 },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 3, width: "100%" }}>
                  <Box
                    sx={{
                      width: { xs: "40%", sm: 140 },
                      height: { xs: 180, sm: 160 },
                      minWidth: { sm: 140 },
                    }}
                  >
                    <LazyImage
                      src={li.img}
                      alt={li.name}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      placeholderColor="#d9d9d9"
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>
                      {li.name}
                      {li.colour ? ` - ${li.colour}` : ""}
                    </Typography>
                    <Typography sx={{ mt: 0.5 }}>x {li.quantity}</Typography>
                    <Typography sx={{ mt: 0.5, color: "#666" }}>Size: {li.size}</Typography>
                    {li.stock != null && li.quantity > li.stock && (
                      <Typography sx={{ mt: 0.5, color: "error.main", fontSize: 14 }}>
                        Only {li.stock} left. Please reduce quantity.
                      </Typography>
                    )}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1 }}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: li.id,
                              colour: li.colour,
                              size: li.size,
                              quantity: Math.max(1, li.quantity - 1),
                            })
                          )
                        }
                        sx={{
                          minWidth: 36,
                          width: 36,
                          height: 32,
                          borderRadius: 1,
                          boxShadow: "none",
                          backgroundColor: "#D9D9D9",
                          color: "black",
                          "&:hover": { backgroundColor: "#C0C0C0", boxShadow: "none" },
                        }}
                      >
                        -
                      </Button>
                      <Box sx={{ px: 1.5, minWidth: 28, textAlign: "center", fontWeight: 600 }}>
                        {li.quantity}
                      </Box>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: li.id,
                              colour: li.colour,
                              size: li.size,
                              quantity: li.quantity + 1,
                            })
                          )
                        }
                        sx={{
                          minWidth: 36,
                          width: 36,
                          height: 32,
                          borderRadius: 1,
                          boxShadow: "none",
                          backgroundColor: "#D9D9D9",
                          color: "black",
                          "&:hover": { backgroundColor: "#C0C0C0", boxShadow: "none" },
                        }}
                      >
                        +
                      </Button>
                      <Button
                        size="small"
                        onClick={() =>
                          dispatch(removeFromCart({ id: li.id, colour: li.colour, size: li.size }))
                        }
                        sx={{
                          ml: 1,
                          color: "#cf2b2b",
                          textTransform: "uppercase",
                          fontWeight: 600,
                          "&:hover": { color: "#a61e1e", backgroundColor: "transparent" },
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Typography sx={{ fontWeight: 500, alignSelf: { xs: "flex-end", sm: "center" } }}>
                  ${li.amount.toFixed(0)}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Divider and totals */}
          <Box sx={{ mt: 6 }}>
            {hasStockIssue && (
              <Alert severity="error" sx={{ mb: 2 }}>
                Some items exceed available stock. Please adjust quantities before checkout.
              </Alert>
            )}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}
            >
              <Typography>Subtotal</Typography>
              <Typography>${subtotal.toFixed(0)}</Typography>
            </Box>
            <Divider />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}
            >
              <Typography>Shipping</Typography>
              <Typography>${shipping.toFixed(0)}</Typography>
            </Box>
            <Divider />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}
            >
              <Typography sx={{ fontWeight: 600 }}>Total</Typography>
              <Typography sx={{ fontWeight: 600 }}>${total.toFixed(0)}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 6 }}>
            <Button
              variant="contained"
              disabled={hasStockIssue || lineItems.length === 0}
              sx={{
                width: 200,
                borderRadius: 2,
                backgroundColor: hasStockIssue || lineItems.length === 0 ? "#999999" : "#323232",
                color: "white",
                "&:hover": {
                  backgroundColor: hasStockIssue || lineItems.length === 0 ? "#999999" : "#404040",
                },
              }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer onLightBackground={true} />
    </>
  );
};

export default Cart;
