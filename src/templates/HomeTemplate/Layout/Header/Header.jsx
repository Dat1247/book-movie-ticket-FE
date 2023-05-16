import _ from "lodash";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Popover } from "antd";
import { TOKEN, USER_LOGIN } from "../../../../utils/settings/config";

export default function Header(props) {
	const { userLogin } = useSelector((state) => state.UserManagementReducer);
	const { navigate } = useSelector((state) => state.HistoryReducer);

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

	const renderThongTinNguoiDung = () => {
		if (_.isEmpty(userLogin)) {
			return (
				<Fragment>
					<button
						onClick={() => {
							navigate("/user/login");
						}}>
						Log in
					</button>
					<button
						onClick={() => {
							navigate("/user/register");
						}}>
						Register
					</button>
				</Fragment>
			);
		}
		return (
			<Popover content={content}>
				{
					<p>
						Hello! <span>{userLogin.taiKhoan}</span>
					</p>
				}
			</Popover>
		);
	};

	return (
		<header className='header-app'>
			<div className='container'>
				<NavLink to='/'>
					<img
						src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png'
						alt='cyberlearn.vn'
					/>
				</NavLink>

				<div className='btnGroups'>{renderThongTinNguoiDung()}</div>
			</div>
		</header>
	);
}
