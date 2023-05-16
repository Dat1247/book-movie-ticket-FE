import React, { useEffect } from "react";
import { Button, Form, Input, Tabs } from "antd";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import moment from "moment";
import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import {
	getDetailUserAction,
	updateUserAction,
} from "../../redux/actions/UserManagementAction";
import { useNavigate } from "react-router-dom";

export default function Profile(props) {
	// const { userLogin, userDetail } = useSelector(
	// 	(state) => state.UserManagementReducer
	// );
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const store = useStore().getState().UserManagementReducer;
	const { userDetail, userLogin } = store;
	console.log("store profile", store);

	useEffect(() => {
		if (!localStorage.getItem(USER_LOGIN)) {
			alert("You need to login to access this page!");
			navigate("/user/login");
		}
	}, []);

	useEffect(() => {
		dispatch(getDetailUserAction());
	}, [dispatch, userDetail]);

	console.log({ userLogin, userDetail });

	const itemsProfile = [
		{
			label: "01 ACCOUNT DETAIL",
			key: "1",
			children: (
				<AccountInfo
					userLogin={userLogin}
					userDetail={userDetail}
					dispatch={dispatch}
				/>
			),
		},
		{
			label: "02 BOOKING HISTORY",
			key: "2",
			children: <TicketHistory userDetail={userDetail} />,
		},
	];

	return (
		<div className='profile-user'>
			<div className='profile-content'>
				<div className='container'>
					<Tabs defaultActiveKey='1' items={itemsProfile} />
				</div>
			</div>
		</div>
	);
}

const AccountInfo = (props) => {
	let { userDetail, userLogin, dispatch } = props;
	// const { userLogin, userDetail } = useSelector(
	// 	(state) => state.UserManagementReducer
	// );
	// const dispatch = useDispatch();
	// const { userDetail, userLogin } = useStore().getState().UserManagementReducer;
	// useEffect(() => {
	// 	dispatch(getDetailUserAction());
	// });

	useEffect(() => {
		console.log("in effect", userDetail);
	}, [userDetail]);
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			taiKhoan: userDetail?.taiKhoan,
			matKhau: userDetail?.matKhau,
			email: userDetail?.email,
			soDT: userDetail?.soDT,
			maLoaiNguoiDung: userDetail?.loaiNguoiDung,
			hoTen: userDetail?.hoTen,
			maNhom: userDetail?.maNhom,
		},
		validationSchema: Yup.object().shape({
			matKhau: Yup.string()
				.min(6, "Password is too short!")
				.max(32, "Password is to long!")
				.required("Password is required!"),
			email: Yup.string()
				.email("Email is invalid!")
				.required("Email is required!"),
			soDT: Yup.string()
				.matches(/^\d+$/, "Phone number must be numbers!")
				.required("Phone number is required!"),
			hoTen: Yup.string().required("Name is required!"),
		}),
		onSubmit: (values) => {
			dispatch(updateUserAction(values));
		},
	});
	console.log("profile", { userLogin, userDetail });

	const { values, errors, touched, handleChange, handleSubmit } = formik;

	return (
		<Form
			onSubmitCapture={handleSubmit}
			size='large'
			className='user-info-form'>
			<div>
				<div>
					<Form.Item label='Account'>
						<Input
							name='taiKhoan'
							disabled={true}
							value={values.taiKhoan}
							onChange={handleChange}
						/>
						{errors.taiKhoan && touched.taiKhoan ? (
							<div className='text-danger'>{errors.taiKhoan}</div>
						) : null}
					</Form.Item>
					<Form.Item label='Name'>
						<Input name='hoTen' value={values.hoTen} onChange={handleChange} />
						{errors.hoTen && touched.hoTen ? (
							<div className='text-danger'>{errors.hoTen}</div>
						) : null}
					</Form.Item>
					<Form.Item label='Email'>
						<Input name='email' value={values.email} onChange={handleChange} />
						{errors.email && touched.email ? (
							<div className='text-danger'>{errors.email}</div>
						) : null}
					</Form.Item>
					<Form.Item label='User type'>
						<Input
							name='maLoaiNguoiDung'
							value={values.maLoaiNguoiDung}
							disabled={true}
							onChange={handleChange}
						/>
						{errors.maLoaiNguoiDung && touched.maLoaiNguoiDung ? (
							<div className='text-danger'>{errors.maLoaiNguoiDung}</div>
						) : null}
					</Form.Item>
				</div>
				<div>
					<Form.Item label='Password'>
						<Input
							name='matKhau'
							value={values.matKhau}
							onChange={handleChange}
						/>
						{errors.matKhau && touched.matKhau ? (
							<div className='text-danger'>{errors.matKhau}</div>
						) : null}
					</Form.Item>
					<Form.Item label='Phone Number'>
						<Input name='soDT' value={values.soDT} onChange={handleChange} />
						{errors.soDT && touched.soDT ? (
							<div className='text-danger'>{errors.soDT}</div>
						) : null}
					</Form.Item>
					<Form.Item label='Group ID'>
						<Input
							name='maNhom'
							disabled={true}
							value={values.maNhom}
							onChange={handleChange}
						/>
					</Form.Item>
					<div className='btnUpdate'>
						<Button htmlType='submit' type='primary'>
							Update
						</Button>
					</div>
				</div>
			</div>
		</Form>
	);
};

const TicketHistory = (props) => {
	const { userDetail } = useSelector((state) => state.UserManagementReducer);
	const renderTicketItem = () => {
		return userDetail?.thongTinDatVe?.map((ticket, index) => {
			const seats = _.first(ticket.danhSachGhe);

			return (
				<div className='p-2 ticketItem w-full' key={index}>
					<div className='h-full flex items-center border-gray-200 border p-4 rounded-lg bg-gray-100'>
						<img
							alt='team'
							className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
							src={ticket.hinhAnh}
						/>
						<div className='flex-grow item-detail'>
							<h2 className='text-gray-900 title-font font-bold text-lg'>
								{ticket.tenPhim}
							</h2>
							<p className='text-gray-500'>
								Booking date:
								{moment(ticket.ngayDat).format(" hh:mm A - DD-MM-YYYY")}
							</p>
							<p>
								Location: {seats.tenHeThongRap} - {seats.tenCumRap}
							</p>
							<p>
								Seats:{" "}
								{ticket.danhSachGhe?.map((ghe, index) => {
									return (
										<span key={index} className='text-green-800 pr-1 font-bold'>
											{"[ "}
											{ghe.tenGhe}
											{" ]"}
										</span>
									);
								})}
							</p>
						</div>
					</div>
				</div>
			);
		});
	};
	return (
		<section className='user-history-content'>
			<div className='container'>
				<div>
					<h1 className='sm:text-3xl history-title'>TICKET HISTORY</h1>
				</div>
				<div className='grid grid-cols-1 lg:gap-10 lg:grid-cols-2'>
					{renderTicketItem()}
				</div>
			</div>
		</section>
	);
};
