import axios from "axios";
import { getItemLocalStorage } from "../../../helpers/Localstorage";
import { IUserLocalStorage } from "../../../helpers/Localstorage/interfaces/IUserLocalStorage";

const api = axios.create({
	baseURL: `${process.env.REACT_APP_BASE_URL}/account`,
});

export async function requestBalance() {
	try {
		const user = getItemLocalStorage("user") as IUserLocalStorage;
		api.defaults.headers.common.Authorization = user.token;
		const { data } = await api.get("/balance");
		return data;
	} catch (error: any) {
		console.error(error);
		return error.response?.data.message || error.message;
	}
}
