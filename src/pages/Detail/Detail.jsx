import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "../../assets/circle/circle.css";
import moment from "moment";
import { Tabs, Rate } from "antd";
import { getShowtimeDetailsAction } from "../../redux/actions/TheaterManagementAction";

export default function Detail() {
	const { filmDetail } = useSelector((state) => state.TheaterManagementReducer);
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getShowtimeDetailsAction(id));
	}, []);

	const renderDetailOfShowTime = (showTime) => {
		return showTime.cumRapChieu?.map((rapChieu, index) => {
			return (
				<div key={index} className='showTimeItem'>
					<div>
						<img src={rapChieu.hinhAnh} alt={rapChieu.hinhAnh} />
						<div>
							<p>{rapChieu.tenCumRap}</p>
							<p>{rapChieu.diaChi}</p>
						</div>
					</div>
					<div>
						{rapChieu.lichChieuPhim?.map((item, index) => {
							return (
								<div key={index}>
									<NavLink to={`/checkout/${item.maLichChieu}`}>
										{moment(item.ngayChieuGioChieu).format("hh:mm A")}
									</NavLink>
								</div>
							);
						})}
					</div>
				</div>
			);
		});
	};

	const renderDetailOfTheater = () => {
		return filmDetail.heThongRapChieu?.map((showTime, index) => {
			return {
				label: (
					<div>
						<img
							src={showTime.logo}
							alt={showTime.maHeTHongRap}
							style={{ width: 50, height: 50 }}
						/>
					</div>
				),
				key: index,
				children: <Fragment>{renderDetailOfShowTime(showTime)}</Fragment>,
			};
		});
	};

	const renderFilmDetail = () => {
		let ratingStar = filmDetail.danhGia / 2;

		return (
			<div className='filmDetail'>
				<h3>
					Tên phim: <span>{filmDetail.tenPhim}</span>{" "}
				</h3>
				<p>
					Release date:{" "}
					<span>{moment(filmDetail.ngayKhoiChieu).format("DD/MM/YYYY")}</span>
				</p>
				<div>
					Rate: <Rate disabled allowHalf value={ratingStar} />
				</div>
				<p>
					Description: <span>{filmDetail.moTa}</span>
				</p>
			</div>
		);
	};

	const items = [
		{
			label: "Show Time",
			key: "1",
			children: <Tabs tabPosition='left' items={renderDetailOfTheater()} />,
		},
		{
			label: "Detail",
			key: "2",
			children: <Fragment>{renderFilmDetail()}</Fragment>,
		},
	];

	const renderRating = () => {
		let ratingStar = filmDetail.danhGia / 2;

		return (
			<div className='ratingFilm'>
				<div className={`c100  p${(filmDetail.danhGia * 100) / 10} center`}>
					<span>{filmDetail.danhGia}/10</span>
					<div className='slice'>
						<div className='bar'></div>
						<div className='fill'></div>
					</div>
				</div>
				<div className='mt-2'>
					<Rate disabled allowHalf value={ratingStar} />
				</div>
			</div>
		);
	};

	return (
		<div
			className='page-detail'
			style={{
				backgroundImage: `url('${filmDetail.hinhAnh}')`,
			}}>
			<div className='overlay-background'>
				<div>
					<div className='detail-content'>
						<div className='col-span-2'>
							<div className='grid grid-cols-2'>
								<div className=''>
									<img src={filmDetail.hinhAnh} alt='1' />
								</div>
								<div className='detail-info'>
									<p>
										Release date:{" "}
										{moment(filmDetail.ngayKhoiChieu).format("DD/MM/YYYY")}
									</p>
									<p className='filmName'>{filmDetail.tenPhim}</p>
									<p>{filmDetail.moTa?.slice(0, 150) + "..."}</p>
								</div>
							</div>
						</div>{" "}
						{renderRating()}
					</div>
					<div className='mt-20 showTimes'>
						<Tabs centered defaultActiveKey='1' items={items} />
					</div>
				</div>
			</div>
		</div>
	);
}
