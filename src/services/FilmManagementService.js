import { GROUP_ID } from "../utils/settings/config";
import { BaseService } from "./baseService";

export const FilmManagementService = {
	getArrayBanner: () => {
		return BaseService.get(`api/QuanLyPhim/LayDanhSachBanner`);
	},

	getArrayFilm: (filmName = "") => {
		if (filmName !== "") {
			return BaseService.get(
				`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim=${filmName}`
			);
		}
		return BaseService.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`);
	},

	addNewFilm: (formData) => {
		return BaseService.post(`api/QuanLyPhim/ThemPhimUploadHinh`, formData);
	},

	getFilmDetailById: (filmCode) => {
		return BaseService.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${filmCode}`);
	},

	updateFilmDetail: (formDataUpload) => {
		return BaseService.post(`api/QuanLyPhim/CapNhatPhimUpload`, formDataUpload);
	},

	deleteFilm: (filmCode) => {
		return BaseService.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${filmCode}`);
	},
};
