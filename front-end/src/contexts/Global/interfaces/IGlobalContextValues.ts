import { SetState } from "../../../types/SetState";

export interface IGlobalContextValues {
	loading: {
		isLoading: boolean;
		setIsLoading: SetState<boolean>;
	};
}
