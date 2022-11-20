import { X } from "phosphor-react";
import { useContext } from "react";
import { AccountContext } from "../../contexts/Account";
import { TransferForm } from "../TransferForm";
import "./style.css";

export function TransferModal() {
	const { balance } = useContext(AccountContext);

	return(
		<div id="transfer-modal">
			<input type="checkbox" id="transfer-modal-check" className="daisy-modal-toggle" />
			<div className="daisy-modal">
				<div className="daisy-modal-box w-11/12 ">
					<span id="transfer-modal-balance" >{`Saldo da conta: R$ ${balance.toFixed(2)}`}</span>
					<label
						htmlFor="transfer-modal-check"
						className="daisy-tooltip daisy-tooltip-left close-modal"
						data-tip="Fechar"
					>
						<X size={35} weight="bold" color="#000000"/>
					</label>
					<TransferForm />
				</div>
			</div>
		</div>
	);
}
