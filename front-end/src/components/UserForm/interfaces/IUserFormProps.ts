import { SetState } from "../../../types/SetState";
import { IUser } from "./IUser";

export interface IUserFormProps {
	textSubmit: string;
	handleSubmit: (data: IUser, setErrorRequest: SetState<string>) => void;
	textNavigate: string;
	handleNavigation: () => void;
	isLoading: boolean;
	colorLoading: string;
}
