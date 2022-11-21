import { ReactNode, useState } from "react";
import { GlobalContext } from ".";

export function GlobalContextProvider({ children }: { children: ReactNode }) {
	const [isLoading, setIsLoading] = useState(false);

	const contextValues = {
		loading: {
			isLoading,
			setIsLoading,
		}
	};

	return (
		<GlobalContext.Provider value={contextValues}>
			{children}
		</GlobalContext.Provider>
	);
}
