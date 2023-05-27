import React, { Fragment, useEffect } from "react";
import { Button, Input, Table, Popconfirm } from "antd";
import {
	SearchOutlined,
	EditOutlined,
	DeleteOutlined,
	ScheduleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
	deleteFilmAction,
	getArrayFilmAction,
} from "../../../redux/actions/FilmManagementAction";

const { Search } = Input;

export default function Films(props) {
	const { arrFilmDefault } = useSelector(
		(state) => state.FilmManagementReducer
	);
	const { navigate } = useSelector((state) => state.HistoryReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getArrayFilmAction());
	}, [dispatch]);

	const columns = [
		{
			title: "ID",
			dataIndex: "maPhim",
			sorter: (a, b) => a.maPhim - b.maPhim,
			sortDirections: ["descend"],
			width: "10%",
		},
		{
			title: "Name",
			dataIndex: "tenPhim",
			sorter: (a, b) => {
				let nameA = a.tenPhim.toLowerCase().trim();
				let nameB = b.tenPhim.toLowerCase().trim();

				if (nameA > nameB) {
					return 1;
				}
				return -1;
			},
			sortDirections: ["descend", "ascend"],
			width: "30%",
		},
		{
			title: "Image",
			dataIndex: "hinhAnh",
			render: (text, record, index) => {
				return (
					<Fragment>
						<img
							src={record.hinhAnh}
							alt={record.tenPhim}
							onError={(e) => {
								e.target.onError = null;
								e.target.src = `https://picsum.photos/id/${index}/100`;
							}}
						/>
					</Fragment>
				);
			},
			width: "15%",
		},
		{
			title: "Description",
			dataIndex: "moTa",
			render: (text, record, index) => {
				return (
					<div>{text.length > 100 ? text.slice(0, 100) + "..." : text}</div>
				);
			},
			width: "30%",
		},
		{
			title: "Action",
			dataIndex: "",
			render: (text, record, index) => {
				return (
					<div className='btnGroup'>
						<NavLink to={`/admin/films/edit/${record.maPhim}`}>
							<EditOutlined />
						</NavLink>

						<Popconfirm
							placement='top'
							title={"Do you want to delete this film?"}
							onConfirm={() => {
								dispatch(deleteFilmAction(record.maPhim));
							}}
							okText='Yes'
							cancelText='No'>
							<button>
								<DeleteOutlined />
							</button>
						</Popconfirm>

						<NavLink to={`/admin/films/showtime/${record.maPhim}`}>
							<ScheduleOutlined />
						</NavLink>
					</div>
				);
			},
			width: "15%",
		},
	];

	const onSearch = (value) => {
		dispatch(getArrayFilmAction(value));
	};

	return (
		<div className='film-management'>
			<h3>Film Management</h3>
			<Button
				type='primary'
				onClick={() => {
					navigate("/admin/films/addfilm");
				}}>
				Add New Film
			</Button>
			<Search
				placeholder='Search film'
				allowClear
				enterButton={<SearchOutlined />}
				size='large'
				onSearch={onSearch}
				className='find-film-input'
			/>
			<Table
				className='filmTable'
				columns={columns}
				dataSource={arrFilmDefault}
				rowKey={"maPhim"}
			/>
		</div>
	);
}
