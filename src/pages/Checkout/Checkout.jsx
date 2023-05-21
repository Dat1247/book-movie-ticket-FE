import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import _ from "lodash";
import { Popover, Tabs } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import moment from "moment";
import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import { useNavigate, useParams } from "react-router-dom";
import {
	bookTicketAction,
	getRoomDetailAction,
} from "../../redux/actions/TicketManagementAction";
import {
	bookSeats,
	changeTabActive,
} from "../../redux/slices/TicketManagementSlice";
import { getDetailUserAction } from "../../redux/actions/UserManagementAction";

const { TabPane } = Tabs;

function Checkout(props) {
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();
	const { userLogin } = useSelector((state) => state.UserManagementReducer);
	const { roomDetail, arrSeatsBooking, arrSeatsBooked } = useSelector(
		(state) => state.TicketManagementReducer
	);

	const { danhSachGhe, thongTinPhim } = roomDetail;

	const renderGhe = () => {
		return danhSachGhe?.map((seat, index) => {
			let classVipSeat = seat.loaiGhe === "Vip" ? "vipSeat" : "";
			let classOccupied = seat.daDat ? "occupied" : "";
			let classBookingSeat = "";
			let classYourBooked = "";
			let classOtherOneAreBooking = "";

			let indexBookingSeat = arrSeatsBooking?.findIndex(
				(gheDD) => gheDD.maGhe === seat.maGhe
			);
			if (indexBookingSeat !== -1) {
				classBookingSeat = "bookingSeat";
			}
			let indexOtherOneAreBooking = arrSeatsBooked?.findIndex(
				(gheKD) => gheKD.maGhe === seat.maGhe
			);

			if (indexOtherOneAreBooking !== -1) {
				classOtherOneAreBooking = "otherOneAreBooking";
			}

			if (seat.taiKhoanNguoiDat === userLogin.taiKhoan) {
				classYourBooked = "yourBooked";
			}

			return (
				<Fragment key={index}>
					<button
						disabled={seat.daDat || classOtherOneAreBooking !== ""}
						className={`seat ${classVipSeat} ${classOccupied} ${classBookingSeat} ${classYourBooked} ${classOtherOneAreBooking}`}
						onClick={() => {
							dispatch(bookSeats(seat));
						}}>
						<span>{seat.stt}</span>
					</button>

					{(index + 1) % 16 === 0 ? <br /> : ""}
				</Fragment>
			);
		});
	};

	return (
		<div className='booking-seat-container'>
			<div>
				<div className='booking-seat__content'>
					<div>
						<div className='screen'></div>
						<div className='trapezoid'>
							<p>Screen</p>
						</div>
						<div className='render-seats'>{renderGhe()}</div>
						<div>
							<table className='note-seat'>
								<thead>
									<tr>
										<th>Booking</th>
										<th>VIP</th>
										<th>Occupied</th>
										<th>You're booked</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<button className='seat bookingSeat'>0</button>
										</td>
										<td>
											<button className='seat vipSeat'>0</button>
										</td>
										<td>
											<button className='seat occupied'>0</button>
										</td>
										<td>
											<button className='seat yourBooked'>0</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className='booking-seat__info'>
					<div>
						<div>
							<h3>
								{arrSeatsBooking
									?.reduce((tongTien, ghe, index) => {
										return (tongTien += ghe.giaVe);
									}, 0)
									.toLocaleString()}{" "}
								đ
							</h3>
							<hr />
							<div>
								<h3>{thongTinPhim?.tenPhim}</h3>
								<p>Address: {thongTinPhim?.diaChi}</p>
								<p>
									Date: {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu} -{" "}
									{thongTinPhim?.tenRap}
								</p>
							</div>
							<hr />
							<div className='show-seats'>
								<div className='arrSeats'>
									<div>
										<span>Seats</span>
										{_.sortBy(arrSeatsBooking, ["stt"]).map((item, index) => {
											return (
												<span key={index} className='show-seats__item'>
													{item.tenGhe}
												</span>
											);
										})}
									</div>
								</div>
								<span>
									{arrSeatsBooking
										?.reduce((tongTien, ghe, index) => {
											return (tongTien += ghe.giaVe);
										}, 0)
										.toLocaleString()}{" "}
									đ
								</span>
							</div>
							<hr />
							<div>
								<p>Email</p>
								<p>{userLogin.email}</p>
							</div>
							<hr />
							<div>
								<p>Phone</p>
								<p>{userLogin.soDT}</p>
							</div>
						</div>

						<div
							onClick={() => {
								let bookTicketDetail = {
									maLichChieu: params.id,
									danhSachVe: arrSeatsBooking,
								};
								dispatch(bookTicketAction(bookTicketDetail));
							}}>
							ĐẶT VÉ
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function CheckoutTab(props) {
	const { tabActive } = useSelector((state) => state.TicketManagementReducer);
	const { userLogin } = useSelector((state) => state.UserManagementReducer);
	const dispatch = useDispatch();
	const params = useParams();

	useEffect(() => {
		dispatch(getRoomDetailAction(params.id));
	}, []);
	useEffect(() => {
		return () => {
			dispatch(changeTabActive("1"));
		};
	}, []);

	const content = (
		<div className='dropdownUser'>
			{userLogin?.maLoaiNguoiDung === "QuanTri" ? (
				<>
					<p
						className='textAdmin'
						onClick={() => {
							navigate("/admin");
						}}>
						Admin
					</p>
				</>
			) : (
				""
			)}
			<p
				onClick={() => {
					navigate("/profile");
				}}>
				User detail
			</p>

			<p
				onClick={() => {
					localStorage.removeItem(TOKEN);
					localStorage.removeItem(USER_LOGIN);
					navigate("/");
					window.location.reload();
				}}>
				Log out
			</p>
		</div>
	);

	const operations = {
		left: (
			<div
				className='checkout-container__left'
				onClick={() => {
					navigate("/");
				}}>
				{<HomeOutlined />}
			</div>
		),
		right: (
			<Fragment>
				<div className='checkout-container__right'>
					<Popover content={content}>
						{
							<p>
								Xin chào! <span>{userLogin.taiKhoan}</span>
							</p>
						}
					</Popover>
				</div>
			</Fragment>
		),
	};

	const itemsCheckout = [
		{
			label: "01 CHOOSE SEAT & PAYMENT",
			key: "1",
			children: <Checkout />,
		},
		{
			label: "02 BOOKING HISTORY",
			key: "2",
			children: <KetQuaDatVe />,
		},
	];

	return (
		<div className='checkout-container'>
			<Tabs
				defaultActiveKey='1'
				activeKey={tabActive.toString()}
				tabBarExtraContent={operations}
				centered={true}
				onChange={(key) => {
					dispatch(changeTabActive(key));
				}}
				items={itemsCheckout}
			/>
		</div>
	);
}

function KetQuaDatVe(props) {
	const { userDetail } = useSelector((state) => state.UserManagementReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDetailUserAction());
	}, []);

	const renderListTicketBooked = () => {
		return userDetail.thongTinDatVe?.map((item, index) => {
			const arrSeat = _.first(item.danhSachGhe);
			const arrSeatSort = _.sortBy(item.danhSachGhe, "maGhe");
			return (
				<div
					className='h-full flex items-center border-gray-200 border p-4 rounded-lg'
					key={index}>
					<img
						alt='team'
						className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
						src={item.hinhAnh}
					/>
					<div className='flex-grow'>
						<h2 className='text-gray-900 title-font font-medium'>
							{item.tenPhim}
						</h2>

						<p>{moment(item.ngayDat).format("hh:mm A - DD/MM/YYYY")}</p>
						<p>Địa điểm: {arrSeat.tenHeThongRap}</p>
						<p>
							Tên rạp: {arrSeat.tenCumRap} - Ghế:{" "}
							{arrSeatSort.map((ghe, index) => {
								return (
									<span
										key={index}
										className='mr-2 text-green-800 text-lg font-semibold'>
										{"[ "}
										{ghe.tenGhe}
										{" ]"}
									</span>
								);
							})}
						</p>
					</div>
				</div>
			);
		});
	};

	return (
		<div className='container ticket-history-container'>
			<section className='text-gray-600 body-font'>
				<div className='container'>
					<div className='ticket-history-container__tittle'>
						<h1>TICKET HISTORY</h1>
					</div>
					<div className='ticket-history-container__content'>
						{renderListTicketBooked()}
					</div>
				</div>
			</section>
		</div>
	);
}
