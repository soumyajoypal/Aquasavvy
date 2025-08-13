import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../utils/apiRequest";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const getLeaderBoard = createAsyncThunk(
  "leaderboard/getLeaderBoard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest.get("/leaderBoard");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An Error Occurred!"
      );
    }
  }
);

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getLeaderBoard.pending, (state, action) => {
        state.status = "loading";
        state.data = [];
      })
      .addCase(getLeaderBoard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getLeaderBoard.rejected, (state, action) => {
        state.error = action.payload;
      }),
});

export default leaderboardSlice.reducer;
