import { getItemLocalStorage } from "../../../helpers/Localstorage";
import { IUserLocalStorage } from "../../../helpers/Localstorage/interfaces/IUserLocalStorage";
import { requestBalance } from "../../../services/requests/Account";
import { SetState } from "../../../types/SetState";

export async function getBalance(setBalance: SetState<number>, setErrorRequest: SetState<string>) {

	const response = await requestBalance();
	if (typeof response === "string") {
		setErrorRequest(response);
	} else {
		setBalance(response.balance);
	}

}

export function getUser(setUser: SetState<IUserLocalStorage>) {
	const userLocalStorage = getItemLocalStorage("user");
	setUser(userLocalStorage);
}
