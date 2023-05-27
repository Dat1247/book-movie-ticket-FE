import { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";

export const HomeTemplate = (props) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Fragment>
			<Header />

			<Outlet />
			<Footer />
		</Fragment>
	);
};
