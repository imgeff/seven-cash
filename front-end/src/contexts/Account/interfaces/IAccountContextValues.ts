import { IUserLocalStorage } from "../../../helpers/Localstorage/interfaces/IUserLocalStorage";

export interface IAccountContextValues {
	balance: number;
	setBalance: React.Dispatch<React.SetStateAction<number>>;
	user: IUserLocalStorage;
	setUser: React.Dispatch<React.SetStateAction<{
    accountId: number;
    id: number;
    username: string;
    token: string;
	}>>;
	errorRequest: string;
	setErrorRequest: React.Dispatch<React.SetStateAction<string>>;
}
