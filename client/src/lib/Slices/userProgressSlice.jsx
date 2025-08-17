import apiRequest from "../utils/apiRequest";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateScore } from "./userSlice";
import { faLaptopFile } from "@fortawesome/free-solid-svg-icons";

const initialState = JSON.parse(localStorage.getItem("progress")) || {
  elements: [],
  loading: false,
  error: null,
};

export const fetchUserProgress = createAsyncThunk(
  "progress/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await apiRequest.get("/userProgress");
      return res.data.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err?.response?.data || err?.message);
    }
  }
);

export const updateUserProgress = createAsyncThunk(
  "progress/update",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { user, game } = getState();
      const {
        _id: taskId,
        level: levelName,
        element: elementName,
      } = game.currentTask;
      const { score } = user.user;
      const response = await apiRequest.put("/userProgress", {
        score,
        taskId,
        elementName,
        levelName,
      });
      console.log(response.data.data);

      await dispatch(updateScore()).unwrap();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const userProgressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.elements = action.payload.elements;
        localStorage.setItem("progress", JSON.stringify(state));
      })
      .addCase(fetchUserProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProgress.pending, (state) => {
        state.loading = true;
        state.error == null;
      })
      .addCase(updateUserProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.elements = action.payload.elements;
        localStorage.setItem("progress", JSON.stringify(state));
      })
      .addCase(updateUserProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = userProgressSlice.actions;

export default userProgressSlice.reducer;
