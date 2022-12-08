import axios from "axios";
import { getItemLocalStorage } from "../../../helpers/Localstorage";
import { IUserLocalStorage } from "../../../helpers/Localstorage/interfaces/IUserLocalStorage";
import { IRequestTransactionsResponse } from "./interfaces/IRequestTransactionsResponse";

const api = axios.create({
	baseURL: `${import.meta.env.VITE_BASE_URL}/account`,
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

export async function requestTransactions():
	Promise<IRequestTransactionsResponse | string> {
	try {
		const user = getItemLocalStorage("user") as IUserLocalStorage;
		api.defaults.headers.common.Authorization = user.token;
		const { data } = await api.get("/transactions");
		console.log(data);
		return data;
	} catch (error: any) {
		console.error(error);
		return error.response?.data.message || error.message;
	}
}

export async function requestFilterTransactions(filter: string) {
	try {
		const user = getItemLocalStorage("user") as IUserLocalStorage;
		api.defaults.headers.common.Authorization = user.token;
		const { data } = await api.get(`/transactions/${filter}`);
		return data;
	} catch (error: any) {
		console.error(error);
		return error.response?.data.message || error.message;
	}
}
