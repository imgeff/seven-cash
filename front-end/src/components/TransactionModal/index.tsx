import "./style.css";
import { X } from "phosphor-react";
import { useContext } from "react";
import { HeadingMedium } from "../../subcomponents/Headings";
import { TextMedium } from "../../subcomponents/Texts";
import { TransactionTable } from "../TransactionTable";
import { AccountContext } from "../../contexts/Account";
import { TransactionFilter } from "../TransactionFilter";

export enum filters {
	transactionType = "TRANSACTION TYPE",
	transactionDate = "TRANSACTION DATE",
}

export function TransactionModal() {
	const { transactions, errorRequest } = useContext(AccountContext);

	return (
		<div id="transaction-modal">
			<input type="checkbox" id="transaction-modal-check" className="daisy-modal-toggle" />
			<div className="daisy-modal">
				<div className="daisy-modal-box w-11/12">
					<label
						htmlFor="transaction-modal-check"
						className="daisy-tooltip daisy-tooltip-left close-modal"
						data-tip="Fechar"
					>
						<X size={35} weight="bold" color="#000000"/>
					</label>
					<TransactionFilter />
					<div id="transaction-modal-table">
						<HeadingMedium>Transações</HeadingMedium>
						<TransactionTable transactions={transactions} />
					</div>
					<TextMedium style={{ color: "red" }}>{errorRequest}</TextMedium>
				</div>
			</div>
		</div>
	);
}
