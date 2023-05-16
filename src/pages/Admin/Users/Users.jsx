import { Button, Input, Table, Popconfirm, Tag } from "antd";
import {
	SearchOutlined,
	EditOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
	deleteUserAction,
	getArrayUserAction,
} from "../../../redux/actions/UserManagementAction";

const { Search } = Input;

export default function Users(props) {
	const { arrUser } = useSelector((state) => state.UserManagementReducer);
	const { navigate } = useSelector((state) => state.HistoryReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getArrayUserAction());
	}, []);

	const columns = [
		{
			title: "Account",
			dataIndex: "taiKhoan",
			sorter: (a, b) => {
				let accountA = a.taiKhoan.toLowerCase().trim();
				let accountB = b.taiKhoan.toLowerCase().trim();

				if (accountA > accountB) {
					return 1;
				}
				return -1;
			},
			sortDirections: ["descend", "ascend"],
			width: "17%",
		},
		{
			title: "Name",
			dataIndex: "hoTen",
			sorter: (a, b) => {
				let nameA = a.hoTen.toLowerCase().trim();
				let nameB = b.hoTen.toLowerCase().trim();

				if (nameA > nameB) {
					return 1;
				}
				return -1;
			},
			sortDirections: ["descend", "ascend"],
			width: "20%",
		},
		{
			title: "Email",
			dataIndex: "email",
			width: "20%",
		},
		{
			title: "Phone Number",
			dataIndex: "soDt",
			width: "15%",
		},
		{
			title: "User Type",
			dataIndex: "maLoaiNguoiDung",
			filters: [
				{
					text: "Admin",
					value: "QuanTri",
				},
				{
					text: "Client",
					value: "KhachHang",
				},
			],
			onFilter: (value, record) => {
				return record.maLoaiNguoiDung.indexOf(value) === 0;
			},
			render: (text, record, index) => {
				let color = text === "KhachHang" ? "green" : "geekblue";
				return (
					<Tag color={color}>{text === "KhachHang" ? "Client" : "Admin"}</Tag>
				);
			},
			sorter: (a, b) => {
				let userTypeA = a.maLoaiNguoiDung.toLowerCase().trim();
				let userTypeB = b.maLoaiNguoiDung.toLowerCase().trim();

				if (userTypeA > userTypeB) {
					return 1;
				}
				return -1;
			},
			width: "15%",
		},
		{
			title: "Action",
			dataIndex: "",
			render: (text, record, index) => {
				return (
					<div className='btnGroup'>
						<NavLink to={`/admin/users/edit/${record.taiKhoan}`}>
							<EditOutlined />
						</NavLink>

						<Popconfirm
							placement='top'
							title={"Do you want to delete this user?"}
							onConfirm={() => {
								dispatch(deleteUserAction(record.taiKhoan));
							}}
							okText='Yes'
							cancelText='No'>
							<button>
								<DeleteOutlined />
							</button>
						</Popconfirm>
					</div>
				);
			},
			width: "13%",
		},
	];

	const onSearch = (value) => {
		if (value === "") {
			dispatch(getArrayUserAction());
		}
		dispatch(getArrayUserAction(value));
	};

	return (
		<div className='user-management'>
			<h3>User Management</h3>
			<Button
				onClick={() => {
					navigate("/admin/users/adduser");
				}}>
				Add User
			</Button>
			<Search
				placeholder='Find user'
				allowClear
				enterButton={<SearchOutlined />}
				size='large'
				onSearch={onSearch}
				className='find-user-input'
			/>
			<Table
				columns={columns}
				dataSource={arrUser}
				rowKey={"taiKhoan"}
				className='userTable'
			/>
		</div>
	);
}
