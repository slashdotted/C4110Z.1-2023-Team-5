import { createSlice } from "@reduxjs/toolkit";

export interface SettingsState {
    showOnboarding: boolean;
}

const initialState: SettingsState = {
    showOnboarding: true
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
    }
  },
});

export const { showOnboarding, hideOnboarding } = settingsSlice.actions;

export default settingsSlice.reducer;
