import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserManagementService } from "../../services/UserManagementService";
import { closeLoading, openLoading } from "../slices/LoadingSlice";

export const loginAction = createAsyncThunk(
	"userManagement/loginAction",
	async (user, { getState, rejectWithValue }) => {
		try {
			const result = await UserManagementService.login(user);

			const data = result.data;
			const { navigate } = getState().HistoryReducer;

			return { data, navigate };
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const registerAction = createAsyncThunk(
	"userManagement/registerAction",
	async (user, { getState, rejectWithValue }) => {
		try {
			const result = await UserManagementService.register(user);
			const { navigate } = getState().HistoryReducer;
			return { result, navigate };
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const getArrUserTypeAction = createAsyncThunk(
	"userManagement/getArrUserTypeAction",
	async () => {
		const result = await UserManagementService.getArrayUserType();
		return result.data;
	}
);

export const getArrayUserAction = createAsyncThunk(
	"userManagement/getArrayUserAction",
	async (key) => {
		const result = await UserManagementService.getArrayUser(key);
		return result.data;
	}
);

export const deleteUserAction = createAsyncThunk(
	"userManagement/deleteUserAction",
	async (account, { dispatch, rejectWithValue }) => {
		try {
			const result = await UserManagementService.deleteUser(account);
			await dispatch(getArrayUserAction());
			return { result, dispatch };
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const findUserAction = createAsyncThunk(
	"userManagement/findUserAction",
	async (key) => {
		const result = await UserManagementService.findUser(key);
		return result.data;
	}
);

export const addUserAction = createAsyncThunk(
	"userManagement/addUserAction",
	async (newUser, { getState, dispatch, rejectWithValue }) => {
		dispatch(openLoading());

		try {
			const result = await UserManagementService.addUser(newUser);
			const { navigate } = getState().HistoryReducer;
			dispatch(closeLoading());

			return { result, navigate };
		} catch (err) {
			dispatch(closeLoading());

			return rejectWithValue(err);
		}
	}
);

export const updateUserAction = createAsyncThunk(
	"userManagement/updateUserAction",
	async (userUpdate, { getState, rejectWithValue }) => {
		try {
			const result = await UserManagementService.updateUser(userUpdate);
			const { navigate } = getState().HistoryReducer;

			return { result, navigate };
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
export const getDetailUserAction = createAsyncThunk(
	"userManagement/getDetailUserAction",
	async () => {
		const result = await UserManagementService.getAccountDetail();
		console.log("run get detail");
		return result.data;
	}
);
