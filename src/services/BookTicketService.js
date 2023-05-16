import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { BaseService } from "./baseService";

export const BookTicketService = {
	getRoomDetail: (showTimeCode) => {
		return BaseService.get(
			`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showTimeCode}`
		);
	},

	bookingTicket: (thongTinDatVe = new ThongTinDatVe()) => {
		return BaseService.post(`api/QuanLyDatVe/DatVe`, thongTinDatVe);
	},
};
