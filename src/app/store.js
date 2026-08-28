// 1. استيراد دالة إنشاء المتجر من مكتبة Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// 2. استيراد الـ Reducer الخاص بالمصادقة من الشريحة التي جهزناها في المرحلة السابقة
import authReducer from "../features/auth/authSlice";

// 3. إنشاء المتجر وتوحيد كل الـ Reducers بداخله
export const store = configureStore({
  reducer: {
    auth: authReducer, // هنا نربط شريحة المصادقة بالاسم 'auth'
  },
});
