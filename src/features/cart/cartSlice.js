import { createSlice } from "@reduxjs/toolkit";

// 1. حالة ابتدائية مع بيانات تجريبية (عشان تفحص التصميم والعمليات الحسابية)
// لاحقاً لما تربطها بالفايربيس بتخلي الـ items مصفوفة فارغة []
const initialState = {
  items: [
    {
      id: "prod-1",
      title: 'IP65 Waterproof 2 Wire Video Intercom 7" IPS Touch Screen',
      price: 44.09,
      quantity: 6,
      moq: 2, // الحد الأدنى للطلب
      selected: true,
      images: ["https://via.placeholder.com/100"],
    },
    {
      id: "prod-2",
      title: "Wireless Smart Video Doorbell Camera HD",
      price: 25.5,
      quantity: 1,
      moq: 1,
      selected: false, // غير محدد افتراضياً لتجربة السعر
      images: ["https://via.placeholder.com/100"],
    },
  ],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // داخل reducers في cartSlice.js
    addToCart: (state, action) => {
      const { product, quantity, variation } = action.payload;

      // فحص: هل المنتج موجود مسبقاً في السلة؟
      const existingIndex = state.items.findIndex(
        (item) => item.id === product.id && item.variation === variation,
      );

      if (existingIndex >= 0) {
        // إذا كان موجوداً، نزيد كميته فقط
        state.items[existingIndex].quantity += quantity;
      } else {
        // إذا كان جديداً، نضيفه للسلة ومحدد تلقائياً
        state.items.push({
          id: product.id,
          title: product.title || product.name,
          price: Number(product.price),
          quantity: quantity,
          moq: product.moq || 1,
          images: product.images || [product.image],
          variation: variation || "Default",
          selected: true, // محدد تلقائياً ليظهر في ملخص الفاتورة
        });
      }
    },
    // أ) تعديل الكمية (زيادة أو نقصان)
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },

    // ب) حذف منتج من السلة
    removeItem: (state, action) => {
      const id = action.payload; // الـ payload هنا هو الـ id فقط
      state.items = state.items.filter((item) => item.id !== id);
    },

    // ج) تحديد/إلغاء تحديد منتج واحد (الصح البرتقالي)
    toggleSelectItem: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.selected = !item.selected;
      }
    },

    // د) تحديد/إلغاء تحديد كل المنتجات بضغطة واحدة
    toggleSelectAll: (state) => {
      // نفحص أولاً: هل كل المنتجات محددة حالياً؟
      const areAllSelected =
        state.items.length > 0 && state.items.every((item) => item.selected);

      // إذا كلها محددة -> نلغي تحديدها كلها. وإذا لا -> نحددها كلها.
      state.items.forEach((item) => {
        item.selected = !areAllSelected;
      });
    },
  },
});

// تصدير الأوامر عشان تستخدمها الأزرار في الواجهة
export const {
  addToCart,
  updateQuantity,
  removeItem,
  toggleSelectItem,
  toggleSelectAll,
} = cartSlice.actions;

// تصدير الـ reducer عشان نضيفه في store.js
export default cartSlice.reducer;
