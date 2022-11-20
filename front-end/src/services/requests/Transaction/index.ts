import axios from "axios";
import { ITransfer } from "../../../components/TransferForm/interfaces/ITransfer";
import { getItemLocalStorage } from "../../../helpers/Localstorage";
import { IUserLocalStorage } from "../../../helpers/Localstorage/interfaces/IUserLocalStorage";

const api = axios.create({
	baseURL: `${process.env.REACT_APP_BASE_URL}/transaction`,
});

export async function requestTransfer(body: ITransfer) {
	try {
		const user = getItemLocalStorage("user") as IUserLocalStorage;
		api.defaults.headers.common.Authorization = user.token;
		const { data } = await api.post("/transfer", body);
		return data;
	} catch (error: any) {
		console.error(error);
		return error.response?.data.message || error.message;
	}
}
