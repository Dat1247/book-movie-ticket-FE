import { createSlice } from "@reduxjs/toolkit";

export const ShowVideoSlice = createSlice({
	name: "showVideo",
	initialState: {
		isShow: false,
		link: "",
	},
	reducers: {
		showVideo: (state, action) => {
			state.isShow = true;
			state.link = action.payload;
		},
		closeVideo: (state) => {
			state.isShow = false;
		},
	},
});

export const { showVideo, closeVideo } = ShowVideoSlice.actions;
export default ShowVideoSlice.reducer;
