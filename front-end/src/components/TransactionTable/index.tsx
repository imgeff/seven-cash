import "./style.css";
import { ITransactionTableProps } from "./interfaces/ITransactionTableProps";

export function TransactionTable({ transactions }: ITransactionTableProps) {
	return (
		<table className="table">
			<thead>
				<tr>
					<th>Conta de Origem</th>
					<th>Conta de Destino</th>
					<th>Valor</th>
					<th>Data</th>
				</tr>
			</thead>
			<tbody>
				{transactions.map(transaction => (
					<tr key={transaction.id}>
						<td>{transaction.debitedAccountId}</td>
						<td>{transaction.creditedAccountId}</td>
						<td>{transaction.value.toFixed(2)}</td>
						<td>{new Date(transaction.createdAt).toLocaleDateString("pt-BR")}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
