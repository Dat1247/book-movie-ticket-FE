import { createAsyncThunk } from "@reduxjs/toolkit";
import { TheaterManagementService } from "../../services/TheaterManagementService";

export const getTheaterDetailsAction = createAsyncThunk(
	"theaterManagement/getTheaterDetailsAction",
	async () => {
		const result = await TheaterManagementService.getTheaterDetails();
		return result.data;
	}
);
export const getTheaterDetailsFooterAction = createAsyncThunk(
	"theaterManagement/getTheaterDetailsFooterAction",
	async () => {
		const result = await TheaterManagementService.getTheaterDetailsFooter("");
		return result.data;
	}
);

export const getShowtimeDetailsAction = createAsyncThunk(
	"theaterManagement/getShowtimeDetailsAction",
	async (code) => {
		const result = await TheaterManagementService.getShowTimeDetail(code);
		return result.data;
	}
);

export const createShowtimeAction = createAsyncThunk(
	"theaterManagement/createShowtimeAction",
	async (time, { rejectWithValue, getState }) => {
		try {
			const result = await TheaterManagementService.createShowTime(time);
			const { navigate } = getState().HistoryReducer;
			return { result, navigate };
		} catch (err) {
			rejectWithValue(err);
		}
	}
);
