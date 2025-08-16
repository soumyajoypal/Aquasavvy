import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../utils/apiRequest";
import { fetchUserProgress } from "./userProgressSlice";

const initialState = JSON.parse(localStorage.getItem("tutorial")) || {
  currentStep: 0,
  tutorial: {
    completed: false,
    active: true,
    stepsSeen: [],
    elementIntro: {
      farm: false,
      home: false,
      industry: false,
    },
    gamesIntro: {
      quiz: false,
      choice: false,
      puzzle: false,
    },
  },
  loading: false,
  error: null,
};

export const fetchTutorialProgress = createAsyncThunk(
  "tutorial/fetchTutorialProgress",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiRequest.get("/tutorial");
      const data = response.data.data;
      console.log(data);
      await dispatch(fetchUserProgress()).unwrap();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateTutorialProgress = createAsyncThunk(
  "tutorial/updateTutorialProgress",
  async (updatedFields, { rejectWithValue }) => {
    try {
      console.log(updatedFields);
      const { data } = await apiRequest.put("/tutorial", updatedFields);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const resetTutorialProgress = createAsyncThunk(
  "tutorial/resetTutorialProgress",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiRequest.post("/tutorial/reset");
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

function mapBackendToState(state, backendData) {
  state.currentStep = backendData?.currentStep || 0;
  state.tutorial.completed = backendData.completed;
  state.tutorial.active = backendData.active;
  state.tutorial.stepsSeen = backendData.stepsSeen || [];
  state.tutorial.elementIntro = backendData.elementIntro || {
    farm: false,
    home: false,
    industry: false,
  };
  state.tutorial.gamesIntro = backendData.gamesIntro || {
    quiz: false,
    choice: false,
    puzzle: false,
  };
  localStorage.setItem("tutorial", JSON.stringify(state));
  console.log(state);
}

const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
      localStorage.setItem("tutorial", JSON.stringify(state));
    },
    setTutorialActive: (state) => {
      state.tutorial.active = true;
      localStorage.setItem("tutorial", JSON.stringify(state));
    },
    setTutorialDeactive: (state) => {
      state.tutorial.active = false;
      state.currentStep = 0;
      localStorage.setItem("tutorial", JSON.stringify(state));
    },
    prevStep: (state) => {
      state.currentStep -= 1;
      localStorage.setItem("tutorial", JSON.stringify(state));
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
      localStorage.setItem("tutorial", JSON.stringify(state));
    },
    setSelectedElement: (state, action) => {
      state.selectedElement = action.payload;
      localStorage.setItem("tutorial", JSON.stringify(state));
    },
    updateStepsSeen: (state, action) => {
      state.tutorial.stepsSeen.push(action.payload);
      localStorage.setItem("tutorial", JSON.stringify(state));
    },
    completeTutorial: (state) => {
      state.tutorial.active = false;
      state.tutorial.completed = true;
      console.log(state);
      localStorage.setItem("tutorial", JSON.stringify(state));
    },
    resetTutorial: (state) => {
      state.currentStep = 0;
      state.tutorial.completed = false;
      localStorage.setItem("tutorial", JSON.stringify(state));
    },
    setModalOpen: (state) => {
      state.modalOpen = true;
    },
    setModalClose: (state) => {
      state.modalOpen = false;
    },
    setIntroTrue: (state, action) => {
      state.tutorial.elementIntro[action.modalOpen] = true;
      localStorage.setItem("tutorial", JSON.stringify(state));
    },
    setGameTrue: (state, action) => {
      state.tutorial.gamesIntro[action.payload] = true;
      localStorage.setItem("tutorial", JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTutorialProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTutorialProgress.fulfilled, (state, action) => {
        state.loading = false;
        mapBackendToState(state, action.payload); // <- console.log will show here
      })
      .addCase(fetchTutorialProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateTutorialProgress.fulfilled, (state, action) => {
        mapBackendToState(state, action.payload);
      })
      .addCase(updateTutorialProgress.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Reset
      .addCase(resetTutorialProgress.fulfilled, (state, action) => {
        mapBackendToState(state, action.payload);
      })
      .addCase(resetTutorialProgress.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  nextStep,
  prevStep,
  setSelectedElement,
  completeTutorial,
  resetTutorial,
  setModalOpen,
  setModalClose,
  setCurrentTask,
  updateStepsSeen,
  setTutorialActive,
  setTutorialDeactive,
  setCurrentStep,
  setGameTrue,
  setIntroTrue,
} = tutorialSlice.actions;
export default tutorialSlice.reducer;
