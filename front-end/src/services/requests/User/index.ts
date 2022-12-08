import axios from "axios";
import { IUser } from "../../../components/UserForm/interfaces/IUser";

const api = axios.create({
	baseURL: `${process.env.REACT_APP_BASE_URL}/user`,
});

export async function requestLogin(body: IUser) {
	try {
		const { data } = await api.post("/login", body);
		return data;
	} catch (error: any) {
		console.error(error);
		return error.response?.data.message || error.message;
	}
}

export async function requestRegister(body: IUser) {
	try {
		const { data } = await api.post("/register", body);
		return data;
	} catch (error: any) {
		console.error(error);
		return error.response?.data.message || error.message;
	}
}

export default { requestLogin, requestRegister };
