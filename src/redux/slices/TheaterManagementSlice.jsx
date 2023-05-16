import { createSlice } from "@reduxjs/toolkit";
import {
	createShowtimeAction,
	getShowtimeDetailsAction,
	getTheaterDetailsAction,
	getTheaterDetailsFooterAction,
} from "../actions/TheaterManagementAction";
import { Notification } from "../../components/Notification/Notification";

export const TheaterManagementSlice = createSlice({
	name: "theaterManagement",
	initialState: {
		arrTheaters: [],
		arrTheatersFooter: [],
		filmDetail: {},
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getTheaterDetailsAction.fulfilled, (state, action) => {
			state.arrTheaters = action.payload.content;
		});
		builder.addCase(getTheaterDetailsAction.rejected, (state, action) => {
			console.log({ state, action });
		});
		builder.addCase(
			getTheaterDetailsFooterAction.fulfilled,
			(state, action) => {
				state.arrTheatersFooter = action.payload.content;
			}
		);
		builder.addCase(getTheaterDetailsFooterAction.rejected, (state, action) => {
			console.log({ state, action });
		});
		builder.addCase(getShowtimeDetailsAction.fulfilled, (state, action) => {
			state.filmDetail = action.payload.content;
		});
		builder.addCase(getShowtimeDetailsAction.rejected, (state, action) => {
			console.log({ state, action });
		});
		builder.addCase(createShowtimeAction.fulfilled, (state, action) => {
			const { navigate } = action.payload;
			Notification("success", "Create new showtime successfully!");

			navigate("/admin/films");
		});
		builder.addCase(createShowtimeAction.rejected, (state, action) => {
			Notification(
				"error",
				"Create new showtime failed!",
				action.payload.response?.data.content
			);
		});
	},
});

export const {} = TheaterManagementSlice.actions;
export default TheaterManagementSlice.reducer;
