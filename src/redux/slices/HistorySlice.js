import { createSlice } from "@reduxjs/toolkit";

export const HistorySlice = createSlice({
	name: "historySlice",
	initialState: {
		navigate: {},
	},
	reducers: {
		addHistory: (state, action) => {
			state.navigate = action.payload;
		},
	},
});

export const { addHistory } = HistorySlice.actions;
export default HistorySlice.reducer;
