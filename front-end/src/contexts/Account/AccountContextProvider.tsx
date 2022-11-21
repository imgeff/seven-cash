import { ReactNode, useEffect, useState } from "react";
import { AccountContext } from ".";
import { ITransaction } from "../../components/TransactionTable/interfaces/ITransaction";
import { getBalance, getUser } from "./services";

const defaultTransaction: ITransaction = {
	id: 0,
	debitedAccountId: 0,
	creditedAccountId: 0,
	value: 0,
	createdAt: ""
};

export function AccountContextProvider({ children }: { children: ReactNode }) {
	const	[user, setUser] = useState({ accountId: 0, id: 0, username: "", token: "" });
	const [balance, setBalance] = useState(0);
	const [errorRequest, setErrorRequest] = useState("");
	const [transactions, setTransactions] = useState([defaultTransaction]);

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
		transactions,
		setTransactions,
	};

	return (
		<AccountContext.Provider value={contextValues}>
			{children}
		</AccountContext.Provider>
	);
}
