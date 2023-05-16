import React from "react";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { togglePassword } from "../../redux/slices/UserManagementSlice";
import { loginAction } from "../../redux/actions/UserManagementAction";

export default function Login() {
	const dispatch = useDispatch();
	const { isShowPassWord } = useSelector(
		(state) => state.UserManagementReducer
	);

	const formik = useFormik({
		initialValues: {
			taiKhoan: "",
			matKhau: "",
		},
		validationSchema: Yup.object().shape({
			taiKhoan: Yup.string().required("Account is required!"),
			matKhau: Yup.string()
				.min(6, "Password is too short!")
				.max(32, "Password is to long!")
				.required("Password is required!"),
		}),
		onSubmit: (values) => {
			dispatch(loginAction(values));
		},
	});

	const { values, touched, errors, handleChange, handleSubmit } = formik;
	return (
		<div className='user-template__right'>
			<div className='content'>
				<h2>Log in</h2>
				<div>
					<form onSubmit={handleSubmit}>
						<div className='form-control-login'>
							<div>Account</div>
							<input
								value={values.taiKhoan}
								name='taiKhoan'
								onChange={handleChange}
								placeholder='Enter your account'
							/>
							{errors.taiKhoan && touched.taiKhoan ? (
								<div className='text-danger'>{errors.taiKhoan}</div>
							) : null}
						</div>
						<div className='form-control-login passWordInput'>
							<div>
								<div className='title-label'>Password</div>
								<div>
									<a>Forgot your password</a>
								</div>
							</div>
							<input
								type={isShowPassWord ? "text" : "password"}
								value={values.matKhau}
								name='matKhau'
								onChange={handleChange}
								placeholder='Enter your password'
							/>
							<div
								className='showPassword'
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
						</div>
						<div className='btnLogin'>
							<button type='submit'>Log in</button>
						</div>
					</form>
					<div className='textAttention'>
						Do not have an account?{" "}
						<NavLink to='/user/register'>Register</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}
