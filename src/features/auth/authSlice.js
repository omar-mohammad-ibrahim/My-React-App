import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1. الدالة غير المتزامنة للاتصال بالسيرفر
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      // هنا سيتم استدعاء Firebase لاحقاً
      // ونفترض أن السيرفر أعاد بيانات المستخدم
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// 2. الحالة الابتدائية
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// 3. إنشاء الشريحة وربط الحالات
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // أ) قيد الانتظار
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // ب) النجاح
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      // ج) الفشل
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
