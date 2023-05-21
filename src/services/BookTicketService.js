import { BaseService } from "./baseService";

export const BookTicketService = {
	getRoomDetail: (showTimeCode) => {
		return BaseService.get(
			`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showTimeCode}`
		);
	},

	bookTicket: (bookTicketInformation = new ThongTinDatVe()) => {
		return BaseService.post(`api/QuanLyDatVe/DatVe`, bookTicketInformation);
	},
};
