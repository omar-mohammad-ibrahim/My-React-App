import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// قراءة بيانات المستخدم من المتصفح لكي لا يخرج من حسابه عند عمل Refresh
const storedUser = JSON.parse(localStorage.getItem("user"));

// 1. الدالة غير المتزامنة
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      // سنمرر بيانات المستخدم النظيفة لهذه الدالة بعد أن يوافق Firebase عليها
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// 2. الحالة الابتدائية (مربوطة بالذاكرة)
const initialState = {
  user: storedUser || null,
  isAuthenticated: !!storedUser,
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
      // مسح البيانات من المتصفح عند تسجيل الخروج
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        // حفظ البيانات في المتصفح فور نجاح تسجيل الدخول
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
