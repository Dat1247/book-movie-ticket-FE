import { createSlice } from "@reduxjs/toolkit";
import {
	bookTicketAction,
	getRoomDetailAction,
} from "../actions/TicketManagementAction";
import { Notification } from "../../components/Notification/Notification";

export const TicketManagementSlice = createSlice({
	name: "ticketManagementSlice",
	initialState: {
		roomDetail: {},
		arrSeatsBooking: [],
		arrSeatsBooked: [],
		tabActive: 1,
	},
	reducers: {
		changeTabActive: (state, action) => {
			state.tabActive = action.payload;
		},
		bookSeats: (state, action) => {
			const arrSeatsBookingUpdate = state.arrSeatsBooking;
			let index = arrSeatsBookingUpdate.findIndex(
				(item) => item.maGhe === action.payload.maGhe
			);
			if (index !== -1) {
				arrSeatsBookingUpdate.splice(index, 1);
			} else {
				arrSeatsBookingUpdate.push(action.payload);
			}

			state.arrSeatsBooking = arrSeatsBookingUpdate;
		},
		bookTicketSuccess: (state, action) => {
			state.arrSeatsBooking = [];
		},
		changeTab: (state, action) => {
			state.tabActive = 2;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getRoomDetailAction.fulfilled, (state, action) => {
			state.roomDetail = action.payload;
		});
		builder.addCase(getRoomDetailAction.rejected, (state, action) => {
			console.log({ state, action });
		});
		builder.addCase(bookTicketAction.fulfilled, (state, action) => {
			Notification("success", "Ticket booking successfully!");
		});
		builder.addCase(bookTicketAction.rejected, (state, action) => {
			Notification("error", "Ticket booking failed!");
			console.log({ state, action });
		});
	},
});

export const { changeTabActive, bookSeats, bookTicketSuccess, changeTab } =
	TicketManagementSlice.actions;
export default TicketManagementSlice.reducer;
