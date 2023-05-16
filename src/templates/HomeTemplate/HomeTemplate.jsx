import { Fragment, useEffect, useState } from "react";
import { Outlet, Route } from "react-router-dom";
import WarningTemplate from "../WarningTemplate/WarningTemplate";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";

export const HomeTemplate = (props) => {
	const [size, setSize] = useState({
		width: window.innerWidth,
	});

	useEffect(() => {
		window.addEventListener("resize", () => {
			// setSize({ width: window.innerWidth });
		});
		window.scrollTo(0, 0);
	}, [size]);

	// if (size.width >= 1300) {
	return (
		<Fragment>
			<Header />

			<Outlet />
			<Footer />
		</Fragment>
	);
	// } else {
	// 	return <WarningTemplate maxScreen='1300' />;
	// }
};
