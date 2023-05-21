import React, { Suspense, useEffect, useState } from "react";
import {
	Form,
	Input,
	Button,
	Radio,
	DatePicker,
	InputNumber,
	Switch,
} from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
	getFilmDetailsByFilmCodeAction,
	updateFilmDetailAction,
} from "../../../../redux/actions/FilmManagementAction";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { lazy } from "react";

const ErrorImage = lazy(() => import("../../../../assets/img/image-error.png"));

export default function EditFilm(props) {
	const [componentSize, setComponentSize] = useState("default");
	const [imgSrc, setImgSrc] = useState("");
	const { filmDetail } = useSelector((state) => state.FilmManagementReducer);

	const codeFilm = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			maPhim: filmDetail?.maPhim,
			tenPhim: filmDetail?.tenPhim,
			trailer: filmDetail?.trailer,
			moTa: filmDetail?.moTa,
			ngayKhoiChieu: filmDetail?.ngayKhoiChieu,
			dangChieu: filmDetail?.dangChieu,
			sapChieu: filmDetail?.sapChieu,
			hot: filmDetail?.hot,
			danhGia: filmDetail?.danhGia,
			hinhAnh: null,
			maNhom: filmDetail?.maNhom,
		},
		onSubmit: (values) => {
			let formData = new FormData();
			for (let key in values) {
				if (key !== "hinhAnh") {
					if (key === "ngayKhoiChieu") {
						let dateChange = dayjs(values[key]).format("DD/MM/YYYY");
						formData.append(key, dateChange);
					} else {
						formData.append(key, values[key]);
					}
				} else {
					if (values[key] !== null) {
						formData.append("File", values.hinhAnh, values.hinhAnh.name);
					}
				}
			}

			dispatch(updateFilmDetailAction(formData));
		},
	});

	useEffect(() => {
		dispatch(getFilmDetailsByFilmCodeAction(codeFilm.id));
	}, []);

	const onFormLayoutChange = ({ size }) => {
		setComponentSize(size);
	};

	const handleChangeDatePicker = (value) => {
		const changeDate = value.$d;
		formik.setFieldValue("ngayKhoiChieu", changeDate);
	};

	const handleChangeValue = (name) => {
		return (value) => {
			formik.setFieldValue(name, value);
		};
	};

	const handleChangeFile = async (e) => {
		let file = e.target.files[0];

		if (
			file.type === "image/jpeg" ||
			file.type === "image/png" ||
			file.type === "image/gif" ||
			file.type === "image/jpg"
		) {
			await formik.setFieldValue("hinhAnh", file);

			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				setImgSrc(e.target.result);
			};
		}
	};

	return (
		<div className='film-component'>
			<Form
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 14,
				}}
				layout='horizontal'
				initialValues={{
					size: componentSize,
				}}
				onValuesChange={onFormLayoutChange}
				size={componentSize}
				onSubmitCapture={formik.handleSubmit}>
				<h3 className='text-2xl font-semibold ml-16'>Edit Film Detail</h3>
				<Form.Item label='Form Size' name='size'>
					<Radio.Group>
						<Radio.Button value='small'>Small</Radio.Button>
						<Radio.Button value='default'>Default</Radio.Button>
						<Radio.Button value='large'>Large</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item label='Group'>
					<Input name='maNhom' disabled={true} value={formik.values.maNhom} />
				</Form.Item>
				<Form.Item label='Name'>
					<Input
						name='tenPhim'
						onChange={formik.handleChange}
						value={formik.values.tenPhim}
					/>
				</Form.Item>
				<Form.Item label='Trailer'>
					<Input
						name='trailer'
						onChange={formik.handleChange}
						value={formik.values.trailer}
					/>
				</Form.Item>
				<Form.Item label='Description'>
					<Input
						name='moTa'
						onChange={formik.handleChange}
						value={formik.values.moTa}
					/>
				</Form.Item>
				<Form.Item label='Release date'>
					<DatePicker
						format={"DD/MM/YYYY"}
						value={dayjs(formik.values.ngayKhoiChieu)}
						onChange={handleChangeDatePicker}
					/>
				</Form.Item>
				<Form.Item label='Now Showing'>
					<Switch
						onChange={handleChangeValue("dangChieu")}
						checked={formik.values.dangChieu}
					/>
				</Form.Item>
				<Form.Item label='Coming Soon'>
					<Switch
						onChange={handleChangeValue("sapChieu")}
						checked={formik.values.sapChieu}
					/>
				</Form.Item>
				<Form.Item label='Hot'>
					<Switch
						onChange={handleChangeValue("hot")}
						checked={formik.values.hot}
					/>
				</Form.Item>
				<Form.Item label='Rating'>
					<InputNumber
						min={0}
						max={10}
						onChange={handleChangeValue("danhGia")}
						value={formik.values.danhGia}
					/>
				</Form.Item>

				<Form.Item label='Image'>
					<input
						type='file'
						onChange={handleChangeFile}
						accept='image/png, image/jpeg, image/gif, image/jpg'
					/>
					<br />
					<Suspense fallback={<p>Loading...</p>}>
						<img
							src={
								imgSrc === ""
									? filmDetail?.hinhAnh
										? filmDetail?.hinhAnh
										: ErrorImage
									: imgSrc
							}
							alt='...'
						/>
					</Suspense>
				</Form.Item>

				<Form.Item label='Action'>
					<Button htmlType='submit' type='primary'>
						Update
					</Button>
				</Form.Item>
			</Form>
			<Button
				danger
				onClick={() => {
					navigate(-1);
				}}>
				Back
			</Button>
		</div>
	);
}
