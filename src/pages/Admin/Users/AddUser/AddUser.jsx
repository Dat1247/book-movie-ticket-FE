import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { GROUP_ID } from "../../../../utils/settings/config";

import * as Yup from "yup";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import {
	addUserAction,
	getArrUserTypeAction,
} from "../../../../redux/actions/UserManagementAction";
import { useNavigate } from "react-router-dom";
import { togglePassword } from "../../../../redux/slices/UserManagementSlice";

const { Option } = Select;

export default function AddUser(props) {
	const { arrUserType, isShowPassWord } = useSelector(
		(state) => state.UserManagementReducer
	);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			taiKhoan: "",
			matKhau: "",
			email: "",
			soDt: "",
			maLoaiNguoiDung: "",
			hoTen: "",
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

			dispatch(addUserAction(values));
		},
	});

	useEffect(() => {
		dispatch(getArrUserTypeAction());
	}, [dispatch]);

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
				size={"large"}
				onSubmitCapture={formik.handleSubmit}>
				<h3>Add User</h3>
				<Form.Item label='Account'>
					<Input name='taiKhoan' onChange={formik.handleChange} />
					{formik.errors.taiKhoan && formik.touched.taiKhoan ? (
						<div className='text-danger'>{formik.errors.taiKhoan}</div>
					) : null}
				</Form.Item>
				<Form.Item label='Password'>
					<Input
						type={isShowPassWord ? "text" : "password"}
						name='matKhau'
						onChange={formik.handleChange}
					/>
					<div
						className='iconToggle'
						onClick={() => {
							dispatch(togglePassword());
						}}>
						{formik.values.matKhau ? (
							isShowPassWord ? (
								<EyeInvisibleOutlined />
							) : (
								<EyeOutlined />
							)
						) : (
							""
						)}
					</div>
					{formik.errors.matKhau && formik.touched.matKhau ? (
						<div className='text-danger'>{formik.errors.matKhau}</div>
					) : null}
				</Form.Item>
				<Form.Item label='Email'>
					<Input name='email' onChange={formik.handleChange} />
					{formik.errors.email && formik.touched.email ? (
						<div className='text-danger'>{formik.errors.email}</div>
					) : null}
				</Form.Item>
				<Form.Item label='Phone Number'>
					<Input name='soDt' onChange={formik.handleChange} />
					{formik.errors.soDt && formik.touched.soDt ? (
						<div className='text-danger'>{formik.errors.soDt}</div>
					) : null}
				</Form.Item>

				<Form.Item label='User type'>
					<Select
						name='maLoaiNguoiDung'
						onChange={(value) => {
							formik.setFieldValue("maLoaiNguoiDung", value);
						}}>
						{arrUserType.map((item, index) => {
							return (
								<Option value={item.maLoaiNguoiDung} key={index}>
									{item.tenLoai}
								</Option>
							);
						})}
					</Select>
					{formik.errors.maLoaiNguoiDung && formik.touched.maLoaiNguoiDung ? (
						<div className='text-danger'>{formik.errors.maLoaiNguoiDung}</div>
					) : null}
				</Form.Item>
				<Form.Item label='Name'>
					<Input name='hoTen' onChange={formik.handleChange} />
					{formik.errors.hoTen && formik.touched.hoTen ? (
						<div className='text-danger'>{formik.errors.hoTen}</div>
					) : null}
				</Form.Item>

				<Form.Item label='Action'>
					<Button htmlType='submit' type='primary'>
						Add
					</Button>
				</Form.Item>
			</Form>
			<Button
				type='primary'
				danger
				onClick={() => {
					navigate(-1);
				}}>
				Back
			</Button>
		</div>
	);
}
