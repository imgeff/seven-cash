import { ReactNode, useEffect, useState } from "react";
import { AccountContext } from ".";
import { getBalance, getUser } from "./services";

export function AccountContextProvider({ children }: { children: ReactNode }) {
	const	[user, setUser] = useState({ accountId: 0, id: 0, username: "", token: "" });
	const [balance, setBalance] = useState(0);
	const [errorRequest, setErrorRequest] = useState("");

	useEffect(() => {
		getBalance(setBalance, setErrorRequest);
		getUser(setUser);
	}, []);

	const contextValues = {
		user,
		setUser,
		balance,
		setBalance,
		errorRequest,
		setErrorRequest,
	};

	return (
		<AccountContext.Provider value={contextValues}>
			{children}
		</AccountContext.Provider>
	);
}
