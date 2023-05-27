import React from "react";
import Slider from "react-slick";
import FilmFlip from "../Film/Film_Flip";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
	setComingSoonFilm,
	setNowShowingFilm,
} from "../../redux/slices/FilmManagementSlice";

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={`${className}`}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		/>
	);
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={`${className}`}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		/>
	);
}

export default function MultipleRowsSlick(props) {
	const { nowShowing, comingSoon } = useSelector(
		(state) => state.FilmManagementReducer
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const renderFilm = () => {
		return props.arrFilm.slice(0, 12).map((item, index) => {
			return (
				<div key={index} className='film_item'>
					<FilmFlip film={item} dispatch={dispatch} navigate={navigate} />
					<div>
						<NavLink to={`/detail/${item.maPhim}`}>BOOKING</NavLink>
					</div>
				</div>
			);
		});
	};

	const settings = {
		className: "center variable-width",
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		initialSlide: 0,
		speed: 500,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},

			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	return (
		<div className='row-slick-films'>
			<div>
				<button
					className={`${nowShowing ? "active_film" : "none_active_film"}`}
					onClick={() => {
						if (!nowShowing) {
							dispatch(setNowShowingFilm());
						}
					}}>
					NOW SHOWING
				</button>
				<button
					className={`${comingSoon ? "active_film" : "none_active_film"}`}
					onClick={() => {
						if (!comingSoon) {
							dispatch(setComingSoonFilm());
						}
					}}>
					COMING SOON
				</button>
			</div>
			<Slider {...settings}>{renderFilm()}</Slider>
		</div>
	);
}
