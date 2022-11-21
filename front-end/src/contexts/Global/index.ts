import { createContext, SetStateAction } from "react";
import { IGlobalContextValues } from "./interfaces/IGlobalContextValues";

const contextDefaultValues: IGlobalContextValues = {
	loading: {
		isLoading: false,
		setIsLoading: function (value: SetStateAction<boolean>): void {
			throw new Error("Function not implemented.");
		},
	}
};

export const GlobalContext = createContext(contextDefaultValues);
