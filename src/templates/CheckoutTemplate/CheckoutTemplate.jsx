import { Fragment, useEffect, useState } from "react";
import { Outlet, Route } from "react-router-dom";
import { USER_LOGIN } from "../../utils/settings/config";
import WarningTemplate from "../WarningTemplate/WarningTemplate";
import Checkout from "../../pages/Checkout/Checkout";

export const CheckoutTemplate = (props) => {
	// const [size, setSize] = useState({
	// 	width: window.innerWidth,
	// });

	useEffect(() => {
		window.addEventListener("resize", () => {
			// setSize({ width: window.innerWidth });
		});
		window.scrollTo(0, 0);
	}, []);

	// if (!localStorage.getItem(USER_LOGIN)) {
	// 	return <Redirect to='/login' />;
	// }

	// if (size.width >= 1200) {

	return (
		<Fragment>
			<Checkout />
		</Fragment>
	);

	// } else {
	// 	return <WarningTemplate maxScreen='1200' />;
	// }
};
