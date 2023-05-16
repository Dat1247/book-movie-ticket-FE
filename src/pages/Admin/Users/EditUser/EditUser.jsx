import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { GROUP_ID } from "../../../../utils/settings/config";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import {
	findUserAction,
	getArrUserTypeAction,
	updateUserAction,
} from "../../../../redux/actions/UserManagementAction";
import { useNavigate, useParams } from "react-router-dom";
import { togglePassword } from "../../../../redux/slices/UserManagementSlice";

const { Option } = Select;

export default function EditUser(props) {
	const [componentSize, setComponentSize] = useState("default");
	const { arrUserType, userUpdate, isShowPassWord } = useSelector(
		(state) => state.UserManagementReducer
	);
	const account = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getArrUserTypeAction());
		dispatch(findUserAction(account.taiKhoan));
	}, []);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			taiKhoan: userUpdate?.taiKhoan,
			matKhau: userUpdate?.matKhau,
			email: userUpdate?.email,
			soDt: userUpdate?.soDt,
			maLoaiNguoiDung: userUpdate?.maLoaiNguoiDung,
			hoTen: userUpdate?.hoTen,
			maNhom: "",
		},
		validationSchema: Yup.object().shape({
			taiKhoan: Yup.string().required("Account is required!"),
			matKhau: Yup.string()
				.min(6, "Password is too short!")
				.max(32, "Password is too long!")
				.required("Password is required!"),
			email: Yup.string()
				.email("Invalid email!")
				.required("Email is Required!"),
			soDt: Yup.string()
				.matches(/^\d+$/, "Phone number must be numeric!")
				.required("Phone number is required!"),
			hoTen: Yup.string().required("Name is required!!"),
			maLoaiNguoiDung: Yup.string().required(
				"You have not selected a user type!"
			),
		}),
		onSubmit: (values) => {
			values.maNhom = GROUP_ID;
			dispatch(updateUserAction(values));
		},
	});

	const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
		formik;

	const onFormLayoutChange = ({ size }) => {
		setComponentSize(size);
	};

	return (
		<div className='user-component'>
			<Form
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 14,
				}}
				layout='horizontal'
				initialValues={{
					size: componentSize,
				}}
				onValuesChange={onFormLayoutChange}
				size={componentSize}
				onSubmitCapture={handleSubmit}>
				<h3 className='text-2xl font-semibold ml-16'>Edit User</h3>
				<Form.Item label='Form Size' name='size'>
					<Radio.Group>
						<Radio.Button value='small'>Small</Radio.Button>
						<Radio.Button value='default'>Default</Radio.Button>
						<Radio.Button value='large'>Large</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item label='Account'>
					<Input
						disabled={true}
						name='taiKhoan'
						value={values.taiKhoan}
						onChange={formik.handleChange}
					/>
					{errors.taiKhoan && touched.taiKhoan ? (
						<div className='text-danger'>{errors.taiKhoan}</div>
					) : null}
				</Form.Item>
				<Form.Item label='Password'>
					<Input
						value={values.matKhau}
						type={isShowPassWord ? "text" : "password"}
						name='matKhau'
						onChange={formik.handleChange}
					/>
					<div
						className='iconToggle'
						onClick={() => {
							dispatch(togglePassword());
						}}>
						{values.matKhau ? (
							isShowPassWord ? (
								<EyeInvisibleOutlined />
							) : (
								<EyeOutlined />
							)
						) : (
							""
						)}
					</div>
					{errors.matKhau && touched.matKhau ? (
						<div className='text-danger'>{errors.matKhau}</div>
					) : null}
				</Form.Item>
				<Form.Item label='Email'>
					<Input
						name='email'
						value={values.email}
						onChange={formik.handleChange}
					/>
					{errors.email && touched.email ? (
						<div className='text-danger'>{errors.email}</div>
					) : null}
				</Form.Item>
				<Form.Item label='Phone Number'>
					<Input
						name='soDt'
						value={values.soDt}
						onChange={formik.handleChange}
					/>
					{errors.soDt && touched.soDt ? (
						<div className='text-danger'>{errors.soDt}</div>
					) : null}
				</Form.Item>

				<Form.Item label='User type'>
					<Select
						name='maLoaiNguoiDung'
						value={values.maLoaiNguoiDung}
						onChange={(value) => {
							formik.setFieldValue("maLoaiNguoiDung", value);
						}}>
						{arrUserType?.map((item, index) => {
							return (
								<Option value={item.maLoaiNguoiDung} key={index}>
									{item.tenLoai}
								</Option>
							);
						})}
					</Select>
					{errors.maLoaiNguoiDung && touched.maLoaiNguoiDung ? (
						<div className='text-danger'>{errors.maLoaiNguoiDung}</div>
					) : null}
				</Form.Item>
				<Form.Item label='Name'>
					<Input
						name='hoTen'
						value={values.hoTen}
						onChange={formik.handleChange}
					/>
					{errors.hoTen && touched.hoTen ? (
						<div className='text-danger'>{errors.hoTen}</div>
					) : null}
				</Form.Item>

				<Form.Item label='Action'>
					<Button htmlType='submit' type='primary'>
						Edit
					</Button>
				</Form.Item>
			</Form>
			<Button
				className='ml-20'
				danger
				onClick={() => {
					navigate(-1);
				}}>
				Back
			</Button>
		</div>
	);
}
