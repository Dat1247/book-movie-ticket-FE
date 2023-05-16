import { createSlice } from "@reduxjs/toolkit";
import { USER_LOGIN, TOKEN, STATUS_CODE } from "../../utils/settings/config";
import { Notification } from "../../components/Notification/Notification";
import { closeLoading } from "./LoadingSlice";
import {
	addUserAction,
	deleteUserAction,
	findUserAction,
	getArrUserTypeAction,
	getArrayUserAction,
	getDetailUserAction,
	loginAction,
	registerAction,
	updateUserAction,
} from "../actions/UserManagementAction";

let user = {};

if (localStorage.getItem(USER_LOGIN)) {
	user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

export const UserManagementSlice = createSlice({
	name: "userManagement",
	initialState: {
		userLogin: user,
		userDetail: {},
		arrUser: [],
		arrUserType: [],
		userUpdate: {},
		isShowPassWord: false,
	},
	reducers: {
		togglePassword: (state, action) => {
			state.isShowPassWord = !state.isShowPassWord;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginAction.fulfilled, (state, action) => {
			const { data, navigate } = action.payload;

			if (data.statusCode === STATUS_CODE.SUCCESS) {
				const userLogin = data.content;
				localStorage.setItem(USER_LOGIN, JSON.stringify(userLogin));
				localStorage.setItem(TOKEN, JSON.stringify(userLogin.accessToken));
				navigate("/");
				state.userLogin = userLogin;
			}
		});
		builder.addCase(loginAction.rejected, (state, action) => {
			console.log("error", { state, action });
		});
		builder.addCase(registerAction.fulfilled, (state, action) => {
			const { result, navigate } = action.payload;
			if (result.data.statusCode === STATUS_CODE.SUCCESS) {
				Notification("success", "Register successfully!");
				navigate("/user/login");
			}
		});
		builder.addCase(registerAction.rejected, (state, action) => {
			let content = "";
			if (action.payload.response?.data.content === "Tài khoản đã tồn tại!") {
				content = "Account already exists!";
			} else if (
				action.payload.response?.data.content === "Email đã tồn tại!"
			) {
				content = "Email already exists!";
			}
			Notification("error", "Register failed!", content);
		});

		builder.addCase(getDetailUserAction.fulfilled, (state, action) => {
			state.userDetail = action.payload.content;
			console.log("slice", state.userDetail);
		});
		builder.addCase(getDetailUserAction.rejected, (state, action) => {
			console.log({ state, action });
		});
		builder.addCase(getArrayUserAction.fulfilled, (state, action) => {
			if (action.payload.statusCode === STATUS_CODE.SUCCESS) {
				state.arrUser = action.payload.content;
			}
		});
		builder.addCase(getArrayUserAction.rejected, (state, action) => {
			console.log("error", action.payload);
		});
		builder.addCase(deleteUserAction.fulfilled, (state, action) => {
			const { result, dispatch } = action.payload;
			if (result.data.statusCode === STATUS_CODE.SUCCESS) {
				Notification("success", "Delete user successfully!");
			}
		});
		builder.addCase(deleteUserAction.rejected, (state, action) => {
			Notification(
				"error",
				"Xóa người dùng thất bại",
				action.payload.response?.data.content
			);
		});
		builder.addCase(findUserAction.fulfilled, (state, action) => {
			if (action.payload.statusCode === STATUS_CODE.SUCCESS) {
				state.userUpdate = action.payload.content[0];
			}
		});
		builder.addCase(findUserAction.rejected, (state, action) => {
			console.log({ state, action });
		});
		builder.addCase(getArrUserTypeAction.fulfilled, (state, action) => {
			if (action.payload.statusCode === STATUS_CODE.SUCCESS) {
				state.arrUserType = action.payload.content;
			}
		});
		builder.addCase(getArrUserTypeAction.rejected, (state, action) => {
			console.log({ state, action });
		});
		builder.addCase(addUserAction.fulfilled, (state, action) => {
			const { result, navigate } = action.payload;
			if (result.data.statusCode === STATUS_CODE.SUCCESS) {
				Notification("success", "Add new user successfully!");
				navigate("/admin/users");
			}
		});
		builder.addCase(addUserAction.rejected, (state, action) => {
			console.log("reject", { state, action });
			Notification(
				"error",
				"Add new user failed!",
				action.payload.response?.data.content
			);
		});
		builder.addCase(updateUserAction.fulfilled, (state, action) => {
			const { result, navigate } = action.payload;
			if (result.data.statusCode === STATUS_CODE.SUCCESS) {
				Notification("success", "Update user successfully!");
				navigate("/admin/users");
			}
		});
		builder.addCase(updateUserAction.rejected, (state, action) => {
			Notification(
				"error",
				"Update user failed!",
				action.payload.response?.data.content
			);
		});
	},
});
export const { togglePassword } = UserManagementSlice.actions;
export default UserManagementSlice.reducer;
