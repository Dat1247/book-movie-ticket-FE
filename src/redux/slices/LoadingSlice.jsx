import { createSlice } from "@reduxjs/toolkit";

export const LoadingSlice = createSlice({
	name: "loadingSlice",
	initialState: {
		isLoading: false,
	},
	reducers: {
		openLoading: (state, action) => {
			state.isLoading = true;
		},
		closeLoading: (state, action) => {
			state.isLoading = false;
		},
	},
});

export const { openLoading, closeLoading } = LoadingSlice.actions;
export default LoadingSlice.reducer;
