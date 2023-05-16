import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import LoadingImage from "../../assets/img/loading.gif";

export default function LoadingComponent() {
	const { isLoading } = useSelector((state) => state.LoadingReducer);

	return (
		<Fragment>
			{isLoading ? (
				<div className='loading'>
					<img src={LoadingImage} alt='loading' />
					<p>Loading...</p>
				</div>
			) : (
				""
			)}
		</Fragment>
	);
}
