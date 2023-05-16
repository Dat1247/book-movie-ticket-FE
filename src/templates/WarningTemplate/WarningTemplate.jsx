import React from "react";
import "./WarningTemplate.css";
import { WarningOutlined } from "@ant-design/icons";

export default function WarningTemplate(props) {
	return (
		<div className='warning-overlay'>
			<WarningOutlined className='warning-icon' />
			<p className='warning-title'>This screen size is too small!</p>
			<p className='warning-info'>
				Your screen width must be larger than {props.maxScreen}px!
			</p>
		</div>
	);
}
