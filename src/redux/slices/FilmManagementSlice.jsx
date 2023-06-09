import { createSlice } from "@reduxjs/toolkit";
import {
	addNewFilmAction,
	deleteFilmAction,
	getArrayBannerAction,
	getArrayFilmAction,
	getFilmDetailsByFilmCodeAction,
	updateFilmDetailAction,
} from "../actions/FilmManagementAction";
import { STATUS_CODE } from "../../utils/settings/config";
import { Notification } from "../../components/Notification/Notification";
import { closeLoading } from "./LoadingSlice";

export const FilmManagementSlice = createSlice({
	name: "filmManagementSlice",
	initialState: {
		arrBanner: [],
		arrFilm: [
			{
				maPhim: 9590,
				tenPhim: "Guardians of the Galaxy 1 (2024) ",
				biDanh: "guardians-of-the-galaxy-1-2024-",
				trailer: "https://www.youtube.com/embed/2LIQ2-PZBC8",
				hinhAnh:
					"http://movieapi.cyberlearn.vn/hinhanh/guardians-of-the-galaxy-1-2014-_gp00.jpg",
				moTa: "Năm 1988, sau khi mẹ qua đời, Peter Quill bị bắt khỏi Tr&aacute;i đất bởi Tộc Yondu Ravager, từ đ&oacute; anh trở th&agrave;nh đạo ch&iacute;ch với biệt danh Star-Lord. Quill t&igrave;m được một quả cầu, b&ecirc;n trong l&agrave; Vi&ecirc;n đ&aacute; Sức mạnh, nhưng rồi anh lại bị bắt ở h&agrave;nh tinh Xandar của Nova Corps. Tại đ&oacute; Quill gặp Gamora, Rocket Racoon, Groot, Drax v&agrave; c&ugrave;ng tho&aacute;t ra. Họ c&ugrave;ng nhau ngăn cản &acirc;m mưu của t&ecirc;n chiến binh Kree l&agrave; Ronan, kẻ muốn d&ugrave;ng quả cầu để hủy diệt Xandar.",
				maNhom: "GP00",
				ngayKhoiChieu: "2022-03-15T22:14:43.677",
				danhGia: 5,
				hot: true,
				dangChieu: true,
				sapChieu: true,
			},
			{
				maPhim: 9592,
				tenPhim: "Avengers: Age of Ultron (2022)",
				biDanh: "avengers-age-of-ultron-2022-",
				trailer: "https://www.youtube.com/embed/tmeOjFno6Do",
				hinhAnh:
					"http://movieapi.cyberlearn.vn/hinhanh/avengers-age-of-ultron-2015-_gp00.jpg",
				moTa: "Sau sự kiện ở Captain America 2021: The Winter Soldier c&aacute;c Avengers tập hợp c&ugrave;ng nhau để ti&ecirc;u diệt t&agrave;n dư Hydra. Nh&oacute;m thu giữ được c&acirc;y trượng của Loki với Vi&ecirc;n đ&aacute; T&acirc;m tr&iacute;, Tony t&iacute;nh d&ugrave;ng sức mạnh của vi&ecirc;n đ&aacute; để bảo vệ nền h&ograve;a b&igrave;nh Tr&aacute;i đất nhưng v&ocirc; t&igrave;nh tạo ra Ultron, một thực thể t&agrave;n &aacute;c với &yacute; định hủy diệt thế giới. Nh&oacute;m Avenger lại c&ugrave;ng nhau hợp sức bảo vệ thế giới v&agrave; đ&aacute;nh bại kẻ th&ugrave; mới n&agrave;y",
				maNhom: "GP00",
				ngayKhoiChieu: "2022-03-15T11:13:57.8",
				danhGia: 8,
				hot: true,
				dangChieu: true,
				sapChieu: false,
			},
		],
		arrFilmDefault: [],
		nowShowing: false,
		comingSoon: false,
		filmDetail: {},
	},
	reducers: {
		setNowShowingFilm: (state, action) => {
			state.nowShowing = true;
			state.comingSoon = false;
			state.arrFilm = state.arrFilmDefault.filter(
				(film) => film.dangChieu === state.nowShowing
			);
		},
		setComingSoonFilm: (state, action) => {
			state.comingSoon = true;
			state.nowShowing = false;

			state.arrFilm = state.arrFilmDefault.filter(
				(film) => film.sapChieu === state.comingSoon
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getArrayBannerAction.fulfilled, (state, action) => {
			state.arrBanner = action.payload.content;
		});
		builder.addCase(getArrayBannerAction.rejected, (state, action) => {
			console.log({ state, action });
		});
		builder.addCase(getArrayFilmAction.fulfilled, (state, action) => {
			state.arrFilm = action.payload.content;
			state.arrFilmDefault = state.arrFilm;
		});
		builder.addCase(getArrayFilmAction.rejected, (state, action) => {
			console.log({ state, action });
		});
		builder.addCase(
			getFilmDetailsByFilmCodeAction.fulfilled,
			(state, action) => {
				state.filmDetail = action.payload.content;
			}
		);
		builder.addCase(
			getFilmDetailsByFilmCodeAction.rejected,
			(state, action) => {
				console.log({ state, action });
			}
		);
		builder.addCase(addNewFilmAction.fulfilled, (state, action) => {
			const { result, navigate } = action.payload;
			if (result.status === STATUS_CODE.SUCCESS) {
				Notification("success", "Add new film successfully!");

				navigate("/admin/films");
			}
		});
		builder.addCase(addNewFilmAction.rejected, (state, action) => {
			console.log({ state, action });
			Notification(
				"error",
				"Update film failed!",
				action.payload.response.data.content
			);
		});
		builder.addCase(updateFilmDetailAction.fulfilled, (state, action) => {
			const { result, navigate, dispatch } = action.payload;
			if (result.status === STATUS_CODE.SUCCESS) {
				Notification("success", "Update film successfully!");
				navigate("/admin/films");
			}
		});
		builder.addCase(updateFilmDetailAction.rejected, (state, action) => {
			console.log({ state, action });
			Notification(
				"error",
				"Update film failed!",
				action.payload.response.data.content
			);
		});
		builder.addCase(deleteFilmAction.fulfilled, (state, action) => {
			Notification("success", "Delete film successfully!");
		});
		builder.addCase(deleteFilmAction.rejected, (state, action) => {
			Notification("error", "Delete film failed!", err.response?.data.content);
		});
	},
});

export const { setNowShowingFilm, setComingSoonFilm } =
	FilmManagementSlice.actions;
export default FilmManagementSlice.reducer;
