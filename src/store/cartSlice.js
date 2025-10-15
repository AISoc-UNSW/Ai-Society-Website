import { createSlice } from "@reduxjs/toolkit";

// Cart item key is composite: productId + colour + size
function makeKey(productId, colour, size) {
  return `${productId}__${colour || ""}__${size || ""}`;
}

const initialState = {
  // itemsByKey: { [key]: { id, colour, size, quantity } }
  itemsByKey: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, colour, size, quantity = 1 } = action.payload || {};
      if (!id) return;
      const key = makeKey(id, colour, size);
      const existing = state.itemsByKey[key];
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.itemsByKey[key] = { id, colour, size, quantity };
      }
    },
    updateQuantity: (state, action) => {
      const { id, colour, size, quantity } = action.payload || {};
      if (!id) return;
      const key = makeKey(id, colour, size);
      const item = state.itemsByKey[key];
      if (!item) return;
      if (quantity <= 0) {
        delete state.itemsByKey[key];
      } else {
        item.quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      const { id, colour, size } = action.payload || {};
      if (!id) return;
      const key = makeKey(id, colour, size);
      delete state.itemsByKey[key];
    },
    clearCart: (state) => {
      state.itemsByKey = {};
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartItemsArray = (state) => Object.values(state.cart.itemsByKey || {});
export const selectCartItemsByKey = (state) => state.cart.itemsByKey || {};

export default cartSlice.reducer;


