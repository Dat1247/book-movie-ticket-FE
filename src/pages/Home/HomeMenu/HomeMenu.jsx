import React, { Fragment, useEffect } from "react";
import { Tabs } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getTheaterDetailsAction } from "../../../redux/actions/TheaterManagementAction";

export default function HomeMenu(props) {
	const { arrTheaters } = useSelector(
		(state) => state.TheaterManagementReducer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTheaterDetailsAction());
	}, [dispatch]);

	const renderListFilm = (theaterNode) => {
		return theaterNode.danhSachPhim.map((film, index) => {
			return (
				<div className='filmItem' key={index}>
					<div>
						<img src={film.hinhAnh} alt={film.hinhAnh} />
						<div>
							<NavLink to={`/detail/${film.maPhim}`}>{film.tenPhim}</NavLink>
							<p>{theaterNode.diaChi}</p>
							<div className='listTime'>
								{film.lstLichChieuTheoPhim?.map((showTime, index) => {
									return (
										<NavLink
											to={`/checkout/${showTime.maLichChieu}`}
											key={index}>
											{moment(showTime.ngayChieuGioChieu).format("hh:mm A")}
										</NavLink>
									);
								})}
							</div>
						</div>
					</div>
					<hr />
				</div>
			);
		});
	};
	const renderTheaterNode = (arrTheaterNode) => {
		return arrTheaterNode.map((theaterNode, index) => {
			return {
				label: (
					<div className='theaterNode'>
						<img
							src={theaterNode.hinhAnh}
							className=' w-12'
							alt={theaterNode.hinhAnh}
						/>
						<p className='ml-2'>{theaterNode.tenCumRap}</p>
					</div>
				),
				key: index,
				children: <Fragment>{renderListFilm(theaterNode)}</Fragment>,
			};
		});
	};

	const itemTheaters = arrTheaters?.map((theater, index) => {
		const itemTheaterNode = renderTheaterNode(theater.lstCumRap);
		return {
			label: (
				<img src={theater.logo} className='imgTheater' alt={theater.logo} />
			),
			key: index,
			children: (
				<Tabs
					tabPosition={"left"}
					items={itemTheaterNode}
					className='tabTheaterNode'
				/>
			),
		};
	});

	return (
		<div className='homeMenu'>
			<Tabs tabPosition={"left"} items={itemTheaters} />
		</div>
	);
}
