import React, { useState } from "react";
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
import moment from "moment";
import { useDispatch } from "react-redux";
import { GROUP_ID } from "../../../../utils/settings/config";
import ErrorImage from "../../../../assets/img/image-error.png";
import { useNavigate } from "react-router-dom";
import { addNewFilmAction } from "../../../../redux/actions/FilmManagementAction";

export default function AddFilm(props) {
	const [componentSize, setComponentSize] = useState("default");
	const [imgSrc, setImgSrc] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			tenPhim: "",
			trailer: "",
			moTa: "",
			ngayKhoiChieu: "",
			dangChieu: false,
			sapChieu: false,
			hot: false,
			danhGia: 0,
			hinhAnh: {},
			maNhom: "",
		},
		onSubmit: (values) => {
			values.maNhom = GROUP_ID;
			let formData = new FormData();
			for (let key in values) {
				if (key !== "hinhAnh") {
					formData.append(key, values[key]);
				} else {
					formData.append("File", values.hinhAnh, values.hinhAnh.name);
				}
			}

			dispatch(addNewFilmAction(formData));
		},
	});

	const onFormLayoutChange = ({ size }) => {
		setComponentSize(size);
	};

	const handleChangeDatePicker = (value) => {
		let releaseDate = moment(value).format("DD/MM/YYYY");
		formik.setFieldValue("ngayKhoiChieu", releaseDate);
	};

	const handleChangeValue = (name) => {
		return (value) => {
			formik.setFieldValue(name, value);
		};
	};

	const handleChangeFile = (e) => {
		let file = e.target.files[0];

		if (
			file.type === "image/jpeg" ||
			file.type === "image/png" ||
			file.type === "image/gif" ||
			file.type === "image/jpg"
		) {
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				setImgSrc(e.target.result);
			};

			formik.setFieldValue("hinhAnh", file);
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
				<h3 className='text-2xl font-semibold ml-16'>Add New Film</h3>
				<Form.Item label='Form Size' name='size'>
					<Radio.Group>
						<Radio.Button value='small'>Small</Radio.Button>
						<Radio.Button value='default'>Default</Radio.Button>
						<Radio.Button value='large'>Large</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item label='Name'>
					<Input name='tenPhim' onChange={formik.handleChange} />
				</Form.Item>
				<Form.Item label='Trailer'>
					<Input name='trailer' onChange={formik.handleChange} />
				</Form.Item>
				<Form.Item label='Description'>
					<Input name='moTa' onChange={formik.handleChange} />
				</Form.Item>
				<Form.Item label='Release Date'>
					<DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
				</Form.Item>
				<Form.Item label='Now Showing'>
					<Switch onChange={handleChangeValue("dangChieu")} />
				</Form.Item>
				<Form.Item label='Coming soon'>
					<Switch onChange={handleChangeValue("sapChieu")} />
				</Form.Item>
				<Form.Item label='Hot'>
					<Switch onChange={handleChangeValue("hot")} />
				</Form.Item>
				<Form.Item label='Rating'>
					<InputNumber
						min={0}
						max={10}
						onChange={handleChangeValue("danhGia")}
					/>
				</Form.Item>

				<Form.Item label='Image'>
					<input
						className='input__image'
						type='file'
						onChange={handleChangeFile}
						accept='image/png, image/jpeg, image/gif, image/jpg'
					/>
					<br />
					<img src={!imgSrc ? ErrorImage : imgSrc} alt='...' />
				</Form.Item>

				<Form.Item label='Action'>
					<Button htmlType='submit' type='primary'>
						Add Film
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
