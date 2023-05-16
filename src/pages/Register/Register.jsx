import React from "react";
import { togglePassword } from "../../redux/slices/UserManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { registerAction } from "../../redux/actions/UserManagementAction";

export default function Register() {
	const { isShowPassWord } = useSelector(
		(state) => state.UserManagementReducer
	);
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			taiKhoan: "",
			matKhau: "",
			email: "",
			soDt: "",
			hoTen: "",
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
		}),
		onSubmit: (values) => {
			dispatch(registerAction(values));
		},
	});

	return (
		<div className='user-template__right'>
			<div className='content'>
				<h2>Register</h2>
				<div>
					<form onSubmit={formik.handleSubmit}>
						<div className='form-control-login'>
							<div>Account</div>
							<input
								name='taiKhoan'
								value={formik.values.taiKhoan}
								placeholder='Enter your account'
								onChange={formik.handleChange}
							/>
							{formik.errors.taiKhoan && formik.touched.taiKhoan ? (
								<div className='text-danger'>{formik.errors.taiKhoan}</div>
							) : null}
						</div>
						<div className='form-control-login passWordInput'>
							<div>
								<div className='title-label'>Password</div>
							</div>
							<input
								type={isShowPassWord ? "text" : "password"}
								name='matKhau'
								value={formik.values.matKhau}
								placeholder='Enter your password'
								onChange={formik.handleChange}
							/>
							<div
								className='showPassword'
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
						</div>
						<div className='form-control-login'>
							<div>
								<div className='title-label'>Email</div>
							</div>
							<input
								name='email'
								value={formik.values.email}
								placeholder='Enter your email'
								onChange={formik.handleChange}
							/>
							{formik.errors.email && formik.touched.email ? (
								<div className='text-danger'>{formik.errors.email}</div>
							) : null}
						</div>
						<div className='form-control-login'>
							<div>
								<div className='title-label'>Phone Number</div>
							</div>
							<input
								name='soDt'
								value={formik.values.soDt}
								placeholder='Enter your phone number'
								onChange={formik.handleChange}
							/>
							{formik.errors.soDt && formik.touched.soDt ? (
								<div className='text-danger' style={{ fontSize: "0.8rem" }}>
									{formik.errors.soDt}
								</div>
							) : null}
						</div>
						<div className='form-control-login'>
							<div>
								<div className='title-label'>Name</div>
							</div>
							<input
								name='hoTen'
								value={formik.values.hoTen}
								placeholder='Enter your name'
								onChange={formik.handleChange}
							/>
							{formik.errors.hoTen && formik.touched.hoTen ? (
								<div className='text-danger' style={{ fontSize: "0.8rem" }}>
									{formik.errors.hoTen}
								</div>
							) : null}
						</div>
						<div className='btnLogin'>
							<button type='submit'>Register</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
