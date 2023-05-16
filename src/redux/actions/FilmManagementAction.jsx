import { createAsyncThunk } from "@reduxjs/toolkit";
import { FilmManagementService } from "../../services/FilmManagementService";

export const getArrayFilmAction = createAsyncThunk(
	"filmManagement/getArrayFilmAction",
	async (filmName = "", { rejectWithValue }) => {
		try {
			const result = await FilmManagementService.getArrayFilm(filmName);
			return result.data;
		} catch (err) {
			// alert(err.response?.data.content);
			return rejectWithValue(err);
		}
	}
);

export const getArrayBannerAction = createAsyncThunk(
	"carousel/getArrayBannerAction",
	async (banner, { rejectWithValue }) => {
		try {
			const result = await FilmManagementService.getArrayBanner();
			return result.data;
		} catch (err) {
			// alert(err.response?.data.content);
			return rejectWithValue(err);
		}
	}
);

export const getFilmDetailsByFilmCodeAction = createAsyncThunk(
	"filmManagement/getFilmDetailsByFilmCodeAction",
	async (filmCode, { rejectWithValue }) => {
		try {
			const result = await FilmManagementService.getFilmDetailById(filmCode);
			return result.data;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const addNewFilmAction = createAsyncThunk(
	"filmManagement/addNewFilmAction",
	async (formData, { dispatch, getState, rejectWithValue }) => {
		try {
			let result = await FilmManagementService.addNewFilm(formData);
			const { navigate } = getState().HistoryReducer;
			return { result, navigate };
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const updateFilmDetailAction = createAsyncThunk(
	"filmManagement/updateFilmDetailAction",
	async (formDataUpload, { dispatch, getState, rejectWithValue }) => {
		try {
			const result = await FilmManagementService.updateFilmDetail(
				formDataUpload
			);
			const { navigate } = getState().HistoryReducer;
			return { result, navigate };
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const deleteFilmAction = createAsyncThunk(
	"filmManagement/deleteFilmAction",
	async (filmCode, { dispatch, rejectWithValue }) => {
		try {
			const result = await FilmManagementService.deleteFilm(filmCode);
			await dispatch(getArrayFilmAction());

			return result;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
