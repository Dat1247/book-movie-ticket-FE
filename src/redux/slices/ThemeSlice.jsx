import { createSlice } from "@reduxjs/toolkit";

export const ThemeSlice = createSlice({
	name: "themeSlice",
	initialState: {
		isDark: true,
	},
	reducers: {
		toggleDarkMode: (state, action) => {
			state.isDark = !state.isDark;
		},
	},
});
export const { toggleDarkMode } = ThemeSlice.actions;
export default ThemeSlice.reducer;
