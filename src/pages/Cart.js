import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Divider, Typography, Alert, TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, selectCartItemsArray, updateQuantity } from "../store/cartSlice";
import LazyImage from "../components/LazyImage";
import MerchFooter from "../components/MerchFooter";
import MerchNavBar from "../components/MerchNavBar";

const SHIPPING_FLAT = 0;

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

function roundCurrency(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function formatCurrency(value) {
  return roundCurrency(value).toFixed(2);
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

const Cart = () => {
  const items = useSelector(selectCartItemsArray);
  const dispatch = useDispatch();
  const [productsById, setProductsById] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [zid, setZid] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

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
      const top_down_shots = product?.top_down_shots || [];
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
        img: top_down_shots[1] || top_down_shots[0],
        stock,
        amount: roundCurrency(price * ci.quantity),
      };
    });
  }, [items, productsById]);

  const subtotal = roundCurrency(lineItems.reduce((sum, li) => sum + li.amount, 0));
  const shipping = lineItems.length > 0 ? SHIPPING_FLAT : 0;
  const total = roundCurrency(subtotal + shipping);
  const hasStockIssue = lineItems.some((li) => li.stock != null && li.quantity > li.stock);
  const isCartEmpty = lineItems.length === 0;

  function isValidEmail(value) {
    return /.+@.+\..+/.test(String(value).trim());
  }

  function isValidZid(value) {
    return /^z\d{7}$/i.test(String(value).trim());
  }

  const isFormValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    isValidEmail(email) &&
    isValidZid(zid);

  async function handlePayWithStripe() {
    setFormError("");
    if (!isFormValid || hasStockIssue || isCartEmpty || submitting) return;
    try {
      setSubmitting(true);
      const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5008";
      const payload = {
        items: lineItems.map((li) => ({
          id: li.id,
          name: li.name,
          price: li.price,
          img: li.img,
          colour: li.colour,
          size: li.size,
          quantity: li.quantity,
        })),
        customerEmail: email.trim(),
        customerName: `${firstName.trim()} ${lastName.trim()}`,
        customerZid: zid.trim(),
      };

      const res = await fetch(`${API_BASE}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to create session");
      }
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (e) {
      setFormError(e?.message || "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  }

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
          <MerchNavBar items={[{ label: "Home", to: "/merch" }, { label: "Cart" }]} />

          {/* Main content: cart items and totals */}
          <Box sx={{ mt: 6 }}>
            {/* Cart items and totals */}
            <Box sx={{ width: "100%" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {lineItems.length === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                      py: 6,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 2,
                    }}
                  >
                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                      Your cart is empty
                    </Typography>
                    <Button
                      component={RouterLink}
                      to="/shop"
                      variant="contained"
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: 600,
                        backgroundColor: "#323232",
                        "&:hover": { backgroundColor: "#404040" },
                      }}
                    >
                      Browse merch
                    </Button>
                  </Box>
                ) : (
                  lineItems.map((li) => (
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
                          <Typography sx={{ fontWeight: 600, textTransform: "capitalize" }}>
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
                            <Box
                              sx={{ px: 1.5, minWidth: 28, textAlign: "center", fontWeight: 600 }}
                            >
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
                                dispatch(
                                  removeFromCart({ id: li.id, colour: li.colour, size: li.size })
                                )
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
                      <Typography
                        sx={{ fontWeight: 500, alignSelf: { xs: "flex-end", sm: "center" } }}
                      >
                        ${formatCurrency(li.amount)}
                      </Typography>
                    </Box>
                  ))
                )}
              </Box>

              {lineItems.length > 0 && (
                <Box sx={{ mt: 6 }}>
                  {hasStockIssue && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      Some items exceed available stock. Please adjust quantities before checkout.
                    </Alert>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                    }}
                  >
                    <Typography>Subtotal</Typography>
                    <Typography>${formatCurrency(subtotal)}</Typography>
                  </Box>
                  <Divider />
                  {shipping > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1,
                      }}
                    >
                      <Typography>Shipping</Typography>
                      <Typography>${formatCurrency(shipping)}</Typography>
                    </Box>
                  )}
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                    }}
                  >
                    <Typography sx={{ fontWeight: 600 }}>Total</Typography>
                    <Typography sx={{ fontWeight: 600 }}>${formatCurrency(total)}</Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Checkout form (white card) - below cart */}
            <Box
              sx={{
                mt: 6,
                width: "95%",
                margin: "48px auto 0 auto",
                backgroundColor: "white",
                p: { xs: 2.5, md: 3 },
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <Typography sx={{ fontWeight: 600, mb: 2 }}>Checkout</Typography>
              <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                <TextField
                  label="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  required
                  size="small"
                />
                <TextField
                  label="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  required
                  size="small"
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                  size="small"
                  error={email.length > 0 && !isValidEmail(email)}
                  helperText={email.length > 0 && !isValidEmail(email) ? "Enter a valid email" : ""}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextField
                  label="UNSW zID"
                  placeholder="e.g. z1234567"
                  value={zid}
                  onChange={(e) => setZid(e.target.value)}
                  fullWidth
                  required
                  size="small"
                  error={zid.length > 0 && !isValidZid(zid)}
                  helperText={
                    zid.length > 0 && !isValidZid(zid) ? "Format: z followed by 7 digits" : ""
                  }
                />
              </Box>

              {formError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {formError}
                </Alert>
              )}

              <Button
                variant="contained"
                onClick={handlePayWithStripe}
                disabled={!isFormValid || hasStockIssue || isCartEmpty || submitting}
                sx={{
                  mt: 3,
                  width: "100%",
                  borderRadius: 2,
                  backgroundColor:
                    !isFormValid || hasStockIssue || isCartEmpty || submitting
                      ? "#999999"
                      : "#323232",
                  color: "white",
                  "&:hover": {
                    backgroundColor:
                      !isFormValid || hasStockIssue || isCartEmpty || submitting
                        ? "#999999"
                        : "#404040",
                  },
                }}
              >
                {submitting ? "Processing…" : "Pay with Stripe"}
              </Button>

              <Typography
                sx={{
                  mt: 2,
                  color: "#B26A00",
                  backgroundColor: "#FFF8E1",
                  borderRadius: 1,
                  px: 1.5,
                  py: 0.7,
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: 1.7,
                }}
              >
                Pickup only: Orders must be collected from an UNSW classroom. Pickup details and
                time will be emailed to you in 1-2 weeks after purchase.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <MerchFooter onLightBackground={true} />
    </>
  );
};

export default Cart;
