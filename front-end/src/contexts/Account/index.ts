import { createContext, SetStateAction } from "react";
import { IAccountContextValues } from "./interfaces/IAccountContextValues";
import { IUserLocalStorage } from "../../helpers/Localstorage/interfaces/IUserLocalStorage";

const contextDefaultValues: IAccountContextValues = {
	balance: 0,
	setBalance: function (value: SetStateAction<number>): void {
		throw new Error("Function not implemented.");
	},
	user: {
		id: 0,
		accountId: 0,
		username: "",
		token: "",
	},
	setUser: function (value: SetStateAction<IUserLocalStorage>): void {
		throw new Error("Function not implemented.");
	},
	errorRequest: "",
	setErrorRequest: function (value: SetStateAction<string>): void {
		throw new Error("Function not implemented.");
	},
};

export const AccountContext = createContext(contextDefaultValues);
