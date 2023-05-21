import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookTicketService } from "../../services/BookTicketService";
import { closeLoading, openLoading } from "../slices/LoadingSlice";
import { STATUS_CODE } from "../../utils/settings/config";
import { bookTicketSuccess, changeTab } from "../slices/TicketManagementSlice";

export const getRoomDetailAction = createAsyncThunk(
	"ticketManagement/getRoomDetailAction",
	async (showTimeID, { rejectWithValue }) => {
		try {
			const { data } = await BookTicketService.getRoomDetail(showTimeID);
			return data.content;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const bookTicketAction = createAsyncThunk(
	"ticketManagement/bookTicketAction",
	async (bookTicketDetail, { dispatch, rejectWithValue }) => {
		dispatch(openLoading());
		try {
			const { status } = await BookTicketService.bookTicket(bookTicketDetail);

			if (status === STATUS_CODE.SUCCESS) {
				await dispatch(getRoomDetailAction(bookTicketDetail.maLichChieu));
				dispatch(bookTicketSuccess());
				dispatch(closeLoading());
				dispatch(changeTab());
			}
		} catch (err) {
			dispatch(closeLoading());
			return rejectWithValue(err);
		}
	}
);
