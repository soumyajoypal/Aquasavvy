import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../utils/apiRequest";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: "idle",
  error: null,
  otpVerification: true,
  otpExpiration: null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiRequest.post("/auth/login", credentials);
      const userData = response.data.data;

      return userData;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiRequest.post("/auth/register", credentials);
      const userData = response.data.data;
      return userData;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiRequest.post("/auth/verify-otp", credentials);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const resendOtp = createAsyncThunk(
  "user/resendOtp",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiRequest.post("/auth/resend-otp", credentials);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest.post("/auth/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = getState().user.user._id; // Fixed user retrieval from state
      const response = await apiRequest.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateScore = createAsyncThunk(
  "user/updateScore",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user, game } = getState();
      const { _id: taskId } = game.currentTask;
      const { score, coins, groundWaterLevel, playerLevel } = user.user;
      const response = await apiRequest.patch(`/user/tasks/${taskId}`, {
        score,
        coins,
        groundWaterLevel,
        playerLevel,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const getLevelFromScore = (score) => {
  if (score >= 1000) return 5;
  if (score >= 750) return 4;
  if (score >= 500) return 3;
  if (score >= 250) return 2;
  return 1;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserFromLocalStorage: (state, action) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setAvatar: (state, action) => {
      if (state.user) {
        state.user.avatar = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    addScore: (state, action) => {
      if (state.user) {
        state.user.score = state.user.score + action.payload;
        state.user.playerLevel = getLevelFromScore(state.user.score);
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    removeScore: (state, action) => {
      if (state.user) {
        state.user.score = Math.max(state.user.score - action.payload, 0);
        state.user.playerLevel = getLevelFromScore(state.user.score);
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    addCoins: (state, action) => {
      if (state.user) {
        state.user.coins = state.user.coins + action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    removeCoins: (state, action) => {
      if (state.user) {
        state.user.coins = Math.max(state.user.coins - action.payload, 0);
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    addWaterLevel: (state, action) => {
      if (state.user) {
        state.user.groundWaterLevel = Math.min(
          state.user.groundWaterLevel + action.payload,
          100
        );
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    removeWaterLevel: (state, action) => {
      if (state.user) {
        state.user.groundWaterLevel = Math.max(
          state.user.groundWaterLevel - action.payload,
          0
        );
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.otpExpiration = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.otpExpiration = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.otpVerification = false;
        state.status = "succeeded";
        state.otpExpiration = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.error = null;
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        localStorage.removeItem("wishlist");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.status = "succeeded";
        state.otpVerification = true;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(resendOtp.pending, (state) => {
        state.status = "loading";
        state.otpExpiration = null;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.otpExpiration = action.payload;
        state.error = null;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.status = "failed";
        state.otpExpiration = null;
        state.error = action.payload;
      })
      .addCase(updateScore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateScore.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateScore.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setUserFromLocalStorage,
  clearError,
  setAvatar,
  addCoins,
  addScore,
  addWaterLevel,
  removeCoins,
  removeWaterLevel,
  removeScore,
} = userSlice.actions;
export default userSlice.reducer;
