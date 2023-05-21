import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_LOGIN } from "../../utils/settings/config";
import WarningTemplate from "../WarningTemplate/WarningTemplate";
import Checkout from "../../pages/Checkout/Checkout";

export const CheckoutTemplate = (props) => {
	const [size, setSize] = useState({
		width: window.innerWidth,
	});
	const navigate = useNavigate();

	useEffect(() => {
		window.addEventListener("resize", () => {
			setSize({ width: window.innerWidth });
		});
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (!localStorage.getItem(USER_LOGIN)) {
			return navigate("/login");
		}
	}, []);

	if (size.width >= 992) {
		return (
			<Fragment>
				<Checkout />
			</Fragment>
		);
	} else {
		return <WarningTemplate maxScreen='992' />;
	}
};
