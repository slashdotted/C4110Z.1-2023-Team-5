import { createSlice } from "@reduxjs/toolkit";

export interface SettingsState {
  showOnboarding: boolean;
  language: string;
  measurementSystem: string;
}

const initialState: SettingsState = {
  showOnboarding: true,
  language: "en",
  measurementSystem: "metric",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    showOnboarding: (state) => {
      state.showOnboarding = true;
    },

    hideOnboarding: (state) => {
      state.showOnboarding = false;
    },

    setLanguage: (state, action) => {
      state.language = action.payload;
    },

    setMeasurementSystem: (state, action) => {
      state.measurementSystem = action.payload;
    },
  },
});

export const {
  showOnboarding,
  hideOnboarding,
  setLanguage,
  setMeasurementSystem,
} = settingsSlice.actions;

export default settingsSlice.reducer;
