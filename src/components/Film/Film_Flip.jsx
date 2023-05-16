import React from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import { showVideo } from "../../redux/slices/ShowVideoSlice";

export default function FilmFlip(props) {
	const { film, dispatch } = props;
	return (
		<div className='flip-card'>
			<div className='flip-card-inner'>
				<div className='flip-card-front'>
					<img src={film.hinhAnh} alt={film.hinhAnh} />
				</div>
				<div className='flip-card-back'>
					<div>
						<img src={film.hinhAnh} alt={film.hinhAnh} />
					</div>
					<div>
						<div
							onClick={() => {
								dispatch(showVideo(film.trailer));
							}}>
							<PlayCircleOutlined />
						</div>
						<div>{film.tenPhim}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
