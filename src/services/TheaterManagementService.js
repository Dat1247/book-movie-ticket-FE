import { GROUP_ID } from "../utils/settings/config";
import { BaseService } from "./baseService";

export const TheaterManagementService = {
	getTheaterDetails: () => {
		return BaseService.get(
			`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`
		);
	},

	getTheaterDetailsFooter: (keyWord) => {
		return BaseService.get(
			`api/QuanLyRap/LayThongTinHeThongRap?maHeThongRap=${keyWord}`
		);
	},

	getShowTimeDetail: (filmCode) => {
		return BaseService.get(
			`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${filmCode}`
		);
	},

	getTheaterDetailsShowTime: () => {
		return BaseService.get(`api/QuanLyRap/LayThongTinHeThongRap`);
	},

	getTheaterClusterByDetails: (theaterCode) => {
		return BaseService.get(
			`api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${theaterCode}`
		);
	},

	createShowTime: (time) => {
		return BaseService.post(`api/QuanLyDatVe/TaoLichChieu`, time);
	},
};
