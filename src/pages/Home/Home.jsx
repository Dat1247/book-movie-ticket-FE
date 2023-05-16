import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultipleRowsSlick from "../../components/RSlick/MultipleRowSlick";
import ShowVideo from "../../components/ShowVideo/ShowVideo";
import { getArrayFilmAction } from "../../redux/actions/FilmManagementAction";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";

const HomeMenu = lazy(() => import("./HomeMenu/HomeMenu"));

export default function Home(props) {
	const { arrFilm } = useSelector((state) => state.FilmManagementReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getArrayFilmAction());
	}, [dispatch]);

	return (
		<div className='home-template'>
			<ShowVideo />
			<HomeCarousel />
			<section className='container main'>
				<div>
					<MultipleRowsSlick arrFilm={arrFilm} />
				</div>

				<Suspense fallback={<p>Loading.....</p>}>
					<HomeMenu />
				</Suspense>
			</section>
		</div>
	);
}
