import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const loadInitialCart = () => {
  try {
    const saved = localStorage.getItem("nexus_cart");
    if (!saved || saved === "undefined" || saved === "null") {
      return [];
    }
    return JSON.parse(saved);
  } catch (error) {
    console.error("Failed to parse local cart:", error);
    return [];
  }
};

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (userId, { getState, rejectWithValue }) => {
    try {
      const localItems = getState().cart.items || [];
      const docRef = doc(db, "carts", userId);
      const docSnap = await getDoc(docRef);
      const cloudItems =
        docSnap.exists() && Array.isArray(docSnap.data().items)
          ? docSnap.data().items
          : [];

      if (localItems.length === 0) {
        return cloudItems;
      }

      const mergedItems = [...cloudItems];

      localItems.forEach((localItem) => {
        const existingIndex = mergedItems.findIndex(
          (item) => item.id === localItem.id,
        );

        if (existingIndex > -1) {
          mergedItems[existingIndex] = {
            ...mergedItems[existingIndex],
            quantity:
              (mergedItems[existingIndex].quantity || 1) +
              (localItem.quantity || 1),
          };
        } else {
          mergedItems.push(localItem);
        }
      });

      await setDoc(
        docRef,
        { items: mergedItems, updatedAt: new Date().toISOString() },
        { merge: true },
      );

      return mergedItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const syncCartToFirebase = createAsyncThunk(
  "cart/syncCartToFirebase",
  async ({ userId, items }, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "carts", userId);
      await setDoc(
        docRef,
        { items, updatedAt: new Date().toISOString() },
        { merge: true },
      );
      return items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  items: loadInitialCart(),
  loading: false,
  error: null,
  isInitialized: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload || [];
    },

    addToCart: (state, action) => {
      const newItem = action.payload;
      const existing = state.items.find((item) => item.id === newItem.id);

      if (existing) {
        existing.quantity += newItem.quantity || 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
          selected: newItem.selected ?? true,
        });
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && quantity >= (item.moq || 1)) {
        item.quantity = quantity;
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    toggleSelectItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.selected = !item.selected;
      }
    },

    toggleSelectAll: (state) => {
      const allSelected =
        state.items.length > 0 && state.items.every((item) => item.selected);
      state.items.forEach((item) => {
        item.selected = !allSelected;
      });
    },

    clearCart: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
        state.isInitialized = true;
        localStorage.removeItem("nexus_cart");
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isInitialized = true;
      });
  },
});

export const {
  setCartItems,
  addToCart,
  updateQuantity,
  removeItem,
  toggleSelectItem,
  toggleSelectAll,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
