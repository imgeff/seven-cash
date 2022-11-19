import { IUser } from "./IUser";

export type SetState =  React.Dispatch<React.SetStateAction<string>>;

export interface IUserFormProps {
	textSubmit: string;
	handleSubmit: (data: IUser, setErrorRequest: SetState) => void;
	textNavigate: string;
	handleNavigation: () => void;
	isLoading: boolean;
	colorLoading: string;
}
