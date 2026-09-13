import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem("nexus_cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem("nexus_cart", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

const initialState = {
  items: loadCartFromStorage(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 1. استقبال وتعيين السلة من Firebase
    setCartItems: (state, action) => {
      state.items = action.payload || [];
      saveCartToStorage(state.items);
    },

    // 2. إضافة منتج جديد أو دمج كميته
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
      saveCartToStorage(state.items);
    },

    // 3. تعديل الكمية مباشرة
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && quantity >= (item.moq || 1)) {
        item.quantity = quantity;
        saveCartToStorage(state.items);
      }
    },

    // 4. حذف صنف بالكامل
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.items);
    },

    // 5. تحديد أو إلغاء تحديد صنف منفرد
    toggleSelectItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.selected = !item.selected;
        saveCartToStorage(state.items);
      }
    },

    // 6. تحديد أو إلغاء تحديد كافة الأصناف
    toggleSelectAll: (state) => {
      const allSelected =
        state.items.length > 0 && state.items.every((item) => item.selected);
      state.items.forEach((item) => {
        item.selected = !allSelected;
      });
      saveCartToStorage(state.items);
    },

    // 7. تفريغ السلة
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    },
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
