import { GROUP_ID } from "../utils/settings/config";
import { BaseService } from "./baseService";

export const UserManagementService = {
	login: (user) => {
		return BaseService.post(`api/QuanLyNguoiDung/DangNhap`, user);
	},

	getAccountDetail: () => {
		return BaseService.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`);
	},

	register: (user) => {
		return BaseService.post(`api/QuanLyNguoiDung/DangKy`, user);
	},

	getArrayUser: (key) => {
		if (key === "" || !key) {
			return BaseService.get(
				`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`
			);
		}
		return BaseService.get(
			`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${key}`
		);
	},

	deleteUser: (account) => {
		return BaseService.delete(
			`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`
		);
	},

	findUser: (key) => {
		return BaseService.get(
			`api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${key}`
		);
	},

	getArrayUserType: () => {
		return BaseService.get(`api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
	},

	addUser: (user) => {
		return BaseService.post(`api/QuanLyNguoiDung/ThemNguoiDung`, user);
	},

	updateUser: (newUser) => {
		return BaseService.put(
			`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
			newUser
		);
	},
};
