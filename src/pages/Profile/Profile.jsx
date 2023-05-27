import React, { useEffect } from "react";
import { Button, Form, Input, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import moment from "moment";
import { USER_LOGIN } from "../../utils/settings/config";
import {
	getDetailUserAction,
	updateUserDetailAction,
} from "../../redux/actions/UserManagementAction";
import { useNavigate } from "react-router-dom";

export default function Profile(props) {
	const { userLogin, userDetail } = useSelector(
		(state) => state.UserManagementReducer
	);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!localStorage.getItem(USER_LOGIN)) {
			alert("You need to login to access this page!");
			navigate("/user/login");
		}
	}, []);

	useEffect(() => {
		dispatch(getDetailUserAction());
	}, [dispatch]);

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

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			taiKhoan: userDetail?.taiKhoan,
			matKhau: userDetail?.matKhau,
			email: userDetail?.email,
			soDT: userDetail?.soDT,
			maLoaiNguoiDung: userLogin?.maLoaiNguoiDung,
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
			dispatch(updateUserDetailAction(values));
		},
	});

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
						<Button
							htmlType='submit'
							type='primary'
							style={{ boxShadow: "none" }}>
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
		return userDetail.thongTinDatVe?.map((item, index) => {
			const arrSeat = _.first(item.danhSachGhe);
			const arrSeatSort = _.sortBy(item.danhSachGhe, "maGhe");
			return (
				<div className='ticketItem' key={index}>
					<img alt='team' src={item.hinhAnh} />
					<div className='flex-grow'>
						<h2>{item.tenPhim}</h2>

						<p>{moment(item.ngayDat).format("hh:mm A - DD/MM/YYYY")}</p>
						<p>Address: {arrSeat.tenHeThongRap}</p>
						<p>
							Theater name: {arrSeat.tenCumRap} - Seats:{" "}
							{arrSeatSort.map((ghe, index) => {
								return (
									<span key={index}>
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
		<section className='user-history-content'>
			<div className='container'>
				<div>
					<h1 className='history-title'>TICKET HISTORY</h1>
				</div>
				<div className='user-history-content__content'>
					{renderTicketItem()}
				</div>
			</div>
		</section>
	);
};
