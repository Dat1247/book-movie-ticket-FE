import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import { Layout, Menu } from "antd";
import {
	DesktopOutlined,
	TeamOutlined,
	UserOutlined,
	DiffOutlined,
	UserAddOutlined,
	FundOutlined,
} from "@ant-design/icons";
import WarningTemplate from "../WarningTemplate/WarningTemplate";

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
	const navigate = useNavigate();
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

	if (widthScreen.width >= 992) {
		return (
			<>
				<Layout className='admin-template'>
					<Sider
						collapsible
						collapsed={state.collapsed}
						onCollapse={onCollapse}>
						<div className='logo' />
						<Menu
							theme='dark'
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
									<div
										onClick={() => {
											navigate("/profile");
										}}>
										<div>{userLogin?.taiKhoan?.substr(0, 1)}</div>
									</div>
									<div
										onClick={() => {
											localStorage.removeItem(USER_LOGIN);
											localStorage.removeItem(TOKEN);
											navigate("/");
											window.location.reload();
										}}
										className='text-danger'>
										Log out
									</div>
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
