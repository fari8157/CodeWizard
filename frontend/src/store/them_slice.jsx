import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: 'theme',
  initialState: { isDarkMode:false},
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
    }
  }
});
export const themeActions = themeSlice.actions;
export const themeReducer=themeSlice.reducer;