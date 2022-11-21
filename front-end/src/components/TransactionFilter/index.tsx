import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../contexts/Account";
import { GlobalContext } from "../../contexts/Global";
import { IEventTarget } from "../../interfaces/IEventTarget";
import { requestFilterTransactions, requestTransactions } from "../../services/requests/Account";
import { PrimaryButton } from "../../subcomponents/Buttons";
import { PrimaryInput } from "../../subcomponents/Inputs";
import { Loading } from "../Loading";
import { filters } from "../TransactionModal";
import "./style.css";

export function TransactionFilter() {
	const { transactionType, transactionDate } = filters;
	const [filterTransaction, setFilterTransaction] = useState({
		filter: transactionType,
		valueFilter: "Todos",
	});
	const { loading: { isLoading, setIsLoading } } = useContext(GlobalContext);
	const { setTransactions, setErrorRequest } = useContext(AccountContext);

	async function getTransactions() {
		const response = await requestTransactions();
		setIsLoading(false);
		if (typeof response === "string") {
			setErrorRequest(response);
		} else {
			setTransactions([...response.creditTransactions, ...response.debitTransactions]);
		}
	}

	function handleFilter({ target: { name, value } }: IEventTarget) {
		setFilterTransaction({ ...filterTransaction, [name]: value });
	}

	async function getTransactionsByType() {
		setIsLoading(true);
		const { valueFilter } = filterTransaction;
		if (valueFilter) {
			const response = await requestFilterTransactions(valueFilter);
			setIsLoading(false);
			if (typeof response === "string") {
				setErrorRequest(response);
			} else {
				const { creditTransactions, debitTransactions } = response;
				setTransactions(creditTransactions ? [...creditTransactions] : [...debitTransactions]);
				setFilterTransaction({ filter: transactionType, valueFilter: "" });
			}
		} else {
			getTransactions();
		}
	}

	async function getTransactionsByDate() {
		setIsLoading(true);
		const response = await requestFilterTransactions(`filter?date=${filterTransaction.valueFilter}`);
		setIsLoading(false);
		if (typeof response === "string") {
			setErrorRequest(response);
		} else {
			const { creditTransactions, debitTransactions } = response;
			setTransactions([...creditTransactions, ...debitTransactions]);
		}
	}

	function handleSubmit() {
		if (filterTransaction.filter === transactionType) {
			getTransactionsByType();
		} else {
			getTransactionsByDate();
		}
	}


	useEffect(() => {
		getTransactions();
	}, []);

	return (
		<div id="filters-transaction">
			<label htmlFor="filter-type">
				Tipo de Filtro
				<select
					className="daisy-select"
					name="filter"
					id="filter-transaction-type"
					onChange={handleFilter}
				>
					<option value={transactionType}>Tipo de Transação</option>
					<option value={transactionDate}>Data da Transação</option>
				</select>
			</label>
			<label htmlFor="filter-transaction-type">
				Tipo de Transação
				<select
					className="daisy-select"
					name="valueFilter" id="filter-transaction-type"
					disabled={ filterTransaction.filter !== transactionType ? true : false }
					onChange={handleFilter}
				>
					<option value="">Todos</option>
					<option value="cashin">Entrada</option>
					<option value="cashout">Saída</option>
				</select>
			</label>
			<label htmlFor="filter-transaction-date">
				Data da Transação
				<PrimaryInput
					type="date"
					className="daisy-btn"
					name="valueFilter"
					disabled={ filterTransaction.filter !== transactionDate ? true : false }
					onChange={handleFilter}
				/>
			</label>
			<PrimaryButton onClick={handleSubmit}>
				{isLoading ? <Loading size="50" color="#000000" /> : "Filtrar"}
			</PrimaryButton>
		</div>
	);
}
