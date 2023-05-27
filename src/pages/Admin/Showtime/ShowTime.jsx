import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker, InputNumber } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Notification } from "../../../components/Notification/Notification";
import { useNavigate, useParams } from "react-router-dom";
import { TheaterManagementService } from "../../../services/TheaterManagementService";
import { createShowtimeAction } from "../../../redux/actions/TheaterManagementAction";

export default function ShowTime(props) {
	const [state, setState] = useState({
		arrTheaters: [],
		arrTheaterClusters: [],
	});
	const dispatch = useDispatch();
	const codeFilm = useParams();
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			maPhim: codeFilm.id,
			ngayChieuGioChieu: "",
			maRap: "",
			giaVe: "",
		},
		onSubmit: (values) => {
			dispatch(createShowtimeAction(values));
		},
	});

	const getArrayTheaterShowTime = async () => {
		try {
			const result = await TheaterManagementService.getTheaterDetailsShowTime();

			setState({
				...state,
				arrTheaters: result.data.content,
			});
		} catch (err) {
			Notification(
				"error",
				"Unable to get theater detail!",
				err.response?.data.content
			);
		}
	};

	useEffect(() => {
		getArrayTheaterShowTime();
	}, [dispatch]);

	const getArrayTheaterClusters = async (maHeThongRap) => {
		try {
			const result = await TheaterManagementService.getTheaterClusterByDetails(
				maHeThongRap
			);

			setState({
				...state,
				arrTheaterClusters: result.data.content,
			});
		} catch (err) {
			Notification(
				"error",
				"Unable to get the list of theater clusters!",
				err.response?.data.content
			);
		}
	};

	const handleChangeTheater = (value) => {
		getArrayTheaterClusters(value);
	};

	const handleChangeTheaterClusters = (value) => {
		formik.setFieldValue("maRap", value);
	};
	const onChangeDate = (value, dateString) => {
		formik.setFieldValue("ngayChieuGioChieu", dateString);
	};

	const onOk = (value) => {
		const formatDate = moment(value.$d).format("DD/MM/YYYY HH:mm:ss");
		formik.setFieldValue("ngayChieuGioChieu", formatDate);
	};

	const onChangeNumber = (value) => {
		formik.setFieldValue("giaVe", value);
	};

	return (
		<div className='showtime-component'>
			<Form
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 14,
				}}
				layout='horizontal'
				initialValues={{
					size: "default",
				}}
				size={"default"}
				onSubmitCapture={formik.handleSubmit}>
				<h3 className='text-2xl'>Create Showtime</h3>

				<Form.Item label='Film Code'>
					<Input value={codeFilm.id} disabled={true} />
				</Form.Item>
				<Form.Item label='Theater'>
					<Select onChange={handleChangeTheater}>
						{state.arrTheaters.map((htr, index) => {
							return (
								<Select.Option value={htr.maHeThongRap} key={index}>
									{htr.tenHeThongRap}
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item>
				<Form.Item label='Theater Cluster'>
					<Select onChange={handleChangeTheaterClusters}>
						{state.arrTheaterClusters.map((cumRap, index) => {
							return (
								<Select.Option value={cumRap.maCumRap} key={index}>
									{cumRap.tenCumRap}
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item>

				<Form.Item label='Release date'>
					<DatePicker
						showTime
						placement='topLeft'
						format='DD/MM/YYYY HH:mm:ss'
						onChange={onChangeDate}
						onOk={onOk}
					/>
				</Form.Item>
				<Form.Item label='Price'>
					<InputNumber min={75000} max={150000} onChange={onChangeNumber} />
				</Form.Item>
				<Form.Item label='Action'>
					<Button htmlType='submit' type='primary'>
						Create
					</Button>
				</Form.Item>
			</Form>
			<Button
				danger
				type='primary'
				onClick={() => {
					navigate(-1);
				}}>
				Back
			</Button>
		</div>
	);
}
