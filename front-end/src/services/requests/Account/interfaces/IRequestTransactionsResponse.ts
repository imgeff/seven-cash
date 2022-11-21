import { ITransaction } from "../../../../components/TransactionTable/interfaces/ITransaction";

export interface IRequestTransactionsResponse {
	id: number;
	balance: number;
	creditTransactions: ITransaction[];
	debitTransactions: ITransaction[];
}
