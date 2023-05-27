import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import { Layout, Menu, Popover } from "antd";
import {
	DesktopOutlined,
	TeamOutlined,
	UserOutlined,
	DiffOutlined,
	UserAddOutlined,
	FundOutlined,
} from "@ant-design/icons";
import WarningTemplate from "../WarningTemplate/WarningTemplate";
import { toggleDarkMode } from "../../redux/slices/ThemeSlice";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

const items = [
	getItem("Users", "sub1", <TeamOutlined />, [
		getItem("Users", "1", <UserOutlined />),
		getItem("Add user", "2", <UserAddOutlined />),
	]),
	getItem("Films", "sub2", <FundOutlined />, [
		getItem("Films", "3", <DesktopOutlined />),
		getItem("Add film", "4", <DiffOutlined />),
	]),
];

export const AdminTemplate = (props) => {
	const { userLogin } = useSelector((state) => state.UserManagementReducer);
	const { isDark } = useSelector((state) => state.ThemeReducer);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [state, setState] = useState({
		collapsed: true,
	});
	const [widthScreen, setWidthScreen] = useState({
		width: window.innerWidth,
	});

	useEffect(() => {
		if (!localStorage.getItem(USER_LOGIN)) {
			alert("You don't have authorization to view this page!");
			return navigate("/");
		}
		if (userLogin.maLoaiNguoiDung !== "QuanTri") {
			alert("You don't have authorization to view this page!");
			return navigate("/");
		}
	}, []);

	useEffect(() => {
		window.addEventListener("resize", () => {
			setWidthScreen({ width: window.innerWidth });
		});
		window.scrollTo(0, 0);
	}, []);

	const onCollapse = (collapsed) => {
		setState({ collapsed });
	};

	const content = (
		<div className={isDark ? "dropdownUser dark" : "dropdownUser"}>
			<div className='dark-mode-toggle'>
				<h3>Dark Mode</h3>
				<div>
					<span>Off</span>
					<label htmlFor='checkbox'>
						<input
							type='checkbox'
							name=''
							id='checkbox'
							checked={isDark}
							onChange={() => {
								dispatch(toggleDarkMode());
							}}
						/>
						<div className='slider'></div>
					</label>
					<span>On</span>
				</div>
			</div>
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

	if (widthScreen.width >= 992) {
		return (
			<>
				<Layout className='admin-template'>
					<Sider
						collapsible
						collapsed={state.collapsed}
						onCollapse={onCollapse}>
						<Menu
							theme={isDark ? "dark" : "light"}
							defaultSelectedKeys={["1"]}
							mode='inline'
							items={items}
							onClick={({ key, keyPath, domEvent }) => {
								switch (key) {
									case "1":
										navigate("/admin/users");
										break;
									case "2":
										navigate("/admin/users/adduser");
										break;
									case "3":
										navigate("/admin/films");
										break;
									case "4":
										navigate("/admin/films/addfilm");
										break;
									default:
										break;
								}
							}}
						/>
					</Sider>
					<Layout className='site-layout'>
						<Header className='site-layout-background'>
							<div>
								<div className='header__right'>
									<NavLink to='/'>
										<img
											src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png'
											alt='cyberlearn.vn'
										/>
									</NavLink>
								</div>
								<div className='header__left'>
									<Popover content={content}>
										{<div>{userLogin?.taiKhoan?.substr(0, 1)}</div>}
									</Popover>
								</div>
							</div>
						</Header>
						<Content>
							<div className='site-layout-background'>
								<Fragment>
									<Outlet />
								</Fragment>
							</div>
						</Content>
					</Layout>
				</Layout>
			</>
		);
	} else {
		return <WarningTemplate maxScreen='992' />;
	}
};
