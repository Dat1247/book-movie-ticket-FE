import "./App.scss";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addHistory } from "./redux/slices/HistorySlice";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import UserTemplate from "./templates/UserTemplate";
import Register from "./pages/Register/Register";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Detail from "./pages/Detail/Detail";
import Profile from "./pages/Profile/Profile";
import { CheckoutTemplate } from "./templates/CheckoutTemplate/CheckoutTemplate";
import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";
import Users from "./pages/Admin/Users/Users";
import AddUser from "./pages/Admin/Users/AddUser/AddUser";
import EditUser from "./pages/Admin/Users/EditUser/EditUser";
import Films from "./pages/Admin/Films/Films";
import AddFilm from "./pages/Admin/Films/AddFilm/AddFilm";
import EditFilm from "./pages/Admin/Films/EditFilm/EditPhim";
import ShowTime from "./pages/Admin/Showtime/ShowTime";

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(addHistory(navigate));
	}, []);

	return (
		<>
			<LoadingComponent />
			<Routes>
				<Route path='/' element={<HomeTemplate />}>
					<Route path='/' element={<Home />} />
					<Route path='/detail/:id' element={<Detail />} />
					<Route path='/profile' element={<Profile />} />
				</Route>
				<Route path='/user' element={<UserTemplate />}>
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
				</Route>
				<Route path='/checkout/:id' element={<CheckoutTemplate />} />
				<Route path='/admin' element={<AdminTemplate />}>
					<Route path='' element={<Users />} />
					<Route path='users' element={<Users />} />
					<Route path='users/adduser' element={<AddUser />} />
					<Route path='users/edit/:taiKhoan' element={<EditUser />} />
					<Route path='films' element={<Films />} />
					<Route path='films/addfilm' element={<AddFilm />} />
					<Route path='films/edit/:id' element={<EditFilm />} />
					<Route path='/admin/films/showtime/:id' element={<ShowTime />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
