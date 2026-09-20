import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { authService } from "../../services/authService";

const loadStoredUser = () => {
  try {
    const saved = localStorage.getItem("user");
    if (!saved || saved === "undefined" || saved === "null") {
      return null;
    }
    return JSON.parse(saved);
  } catch (error) {
    console.error("Failed to parse user from storage:", error);
    return null;
  }
};

const storedUser = loadStoredUser();

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authService.login(email, password);
      return data;
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
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("nexus_cart");
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
        if (action.payload) {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
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

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
