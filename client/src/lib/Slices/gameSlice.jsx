import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../utils/apiRequest";

const initialState = {
  currentTask: {},
  taskType: "",
  gameLevel: "",
  gameElement: "",
  isTaskComplete: false,
  isTaskRunning: false,
  status: "idle",
  error: null,
};

const fetchTask = createAsyncThunk(
  "game/fetchTask",
  async ({ level, element, type }, { rejectWithValue }) => {
    try {
      const res = await apiRequest.get(
        `/tasks?level=${level}&element=${element}&type=${type}`
      );
      console.log(res.data.data[0]);
      return res.data.data[0];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "An error occurred while fetching tasks!"
      );
    }
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setTaskInfo: (state, action) => {
      state.taskType = action.payload.taskType;
      state.gameLevel = action.payload.gameLevel;
      state.gameElement = action.payload.gameElement;
    },
    setTaskComplete: (state) => {
      state.isTaskComplete = true;
      state.isTaskRunning = false;
    },
    resetTask: (state) => {
      state.currentTask = null;
      state.gameLevel = "";
      state.gameElement = "";
      state.taskType = "";
      state.isTaskComplete = false;
      state.isTaskRunning = false;
    },
    setTaskRunning: (state) => {
      state.isTaskRunning = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTask.pending, (state) => {
        state.isTaskComplete = false;
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentTask = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setTaskInfo, setTaskComplete, resetTask, setTaskRunning } =
  gameSlice.actions;
export { fetchTask };
export default gameSlice.reducer;
