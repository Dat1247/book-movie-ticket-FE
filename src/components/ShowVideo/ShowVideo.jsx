import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import { closeVideo } from "../../redux/slices/ShowVideoSlice";

export default function ShowVideo(props) {
	const { isShow, link } = useSelector((state) => state.ShowVideoReducer);
	const dispatch = useDispatch();

	return (
		<Fragment>
			{isShow ? (
				<div className='show-video'>
					<div>
						<CloseOutlined
							onClick={() => {
								dispatch(closeVideo());
							}}
						/>
					</div>
					<div className='video'>
						<iframe src={link} title='Trailer' />
					</div>
				</div>
			) : (
				""
			)}
		</Fragment>
	);
}
