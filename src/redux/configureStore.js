import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import LoadingReducer from "./slices/LoadingSlice.jsx";
import HistoryReducer from "./slices/HistorySlice.js";
import UserManagementReducer from "./slices/UserManagementSlice.jsx";
import FilmManagementReducer from "./slices/FilmManagementSlice.jsx";
import TheaterManagementReducer from "./slices/TheaterManagementSlice.jsx";
import ShowVideoReducer from "./slices/ShowVideoSlice.jsx";
import TicketManagementReducer from "./slices/TicketManagementSlice.jsx";

export const store = configureStore({
	reducer: {
		LoadingReducer: LoadingReducer,
		HistoryReducer: HistoryReducer,
		UserManagementReducer: UserManagementReducer,
		FilmManagementReducer: FilmManagementReducer,
		TheaterManagementReducer: TheaterManagementReducer,
		ShowVideoReducer: ShowVideoReducer,
		TicketManagementReducer: TicketManagementReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});
