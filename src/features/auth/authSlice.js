import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const storedUser = JSON.parse(localStorage.getItem("user"));

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      const { uid, firstName, lastName, phone } = updatedData;

      const userRef = doc(db, "users", uid);

      await updateDoc(userRef, {
        firstName,
        lastName,
        phone,
        updatedAt: new Date().toISOString(),
      });

      return { firstName, lastName, phone };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  user: storedUser || null,
  isAuthenticated: !!storedUser,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
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
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload };

          localStorage.setItem("user", JSON.stringify(state.user));
        }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
