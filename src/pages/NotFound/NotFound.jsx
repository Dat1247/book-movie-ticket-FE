import React from "react";
import PageNotFoundImg from "../../assets/img/page-not-found.png";
import { NavLink } from "react-router-dom";

export default function NotFound() {
	return (
		<div
			className='not-found'
			style={{ backgroundImage: `url(${PageNotFoundImg})` }}>
			<NavLink to='/' className='link-home'>
				Go Home
			</NavLink>
		</div>
	);
}
