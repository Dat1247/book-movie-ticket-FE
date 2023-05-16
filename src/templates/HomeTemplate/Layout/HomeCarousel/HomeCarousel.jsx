import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getArrayBannerAction } from "../../../../redux/actions/FilmManagementAction";

export default function HomeCarousel(props) {
	const { arrBanner } = useSelector((state) => state.FilmManagementReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getArrayBannerAction());
	}, [dispatch]);

	const renderBanner = () => {
		return arrBanner?.map((item, index) => {
			return (
				<div key={index}>
					<div
						style={{
							backgroundImage: `url('${item.hinhAnh}')`,
						}}
						className='banner-item'>
						<img src={item.hinhAnh} alt={item.hinhAnh} />
					</div>
				</div>
			);
		});
	};

	return (
		<Carousel
			effect='fade'
			className='banner-carousel'
			autoplay='true'
			autoplaySpeed={5000}>
			{renderBanner()}
		</Carousel>
	);
}
