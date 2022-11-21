import "./style.css";
import { PrimaryInput } from "../../subcomponents/Inputs";
import { PrimaryButton } from "../../subcomponents/Buttons";
import { useContext, useState } from "react";
import { TextMedium } from "../../subcomponents/Texts";
import { Loading } from "../Loading";
import { requestTransfer } from "../../services/requests/Transaction";
import { AccountContext } from "../../contexts/Account";
import { getBalance } from "../../contexts/Account/services";
import { IEventTarget } from "../../interfaces/IEventTarget";
import { GlobalContext } from "../../contexts/Global";

export function TransferForm() {
	const [transfer, setTransfer] = useState({ username: "", value: "0.00" });
	const [errorRequest, setErrorRequest] = useState("");
	const { loading: { isLoading, setIsLoading } } = useContext(GlobalContext);
	const { setBalance, setErrorRequest: setErrorRequestBalance } = useContext(AccountContext);

	function handleTransferData({ target: { name, value } }: IEventTarget) {
		setTransfer({ ...transfer, [name]: value });
	}

	async function handleTransferSubmit() {
		setIsLoading(true);
		const data = {...transfer, value: parseFloat(transfer.value)};
		const response = await requestTransfer(data);
		setIsLoading(false);
		if (typeof response === "string") {
			setErrorRequest(response);
		} else {
			const checkModal = document.getElementById("transfer-modal-check") as HTMLInputElement;
			checkModal.checked = false;
			setErrorRequest("");
			getBalance(setBalance, setErrorRequestBalance);
		}
	}

	return(
		<form className="form-y-center" id="transfer-form">
			<fieldset id="transfer-form-fields">
				<label htmlFor="transfer-form-field-username">
					Digite nome do usuário que irá receber a transferência
					<PrimaryInput
						id="transfer-form-field-username"
						placeholder="username"
						name="username"
						value={transfer.username}
						onChange={handleTransferData}
						spellCheck={false}
					/>
				</label>
				<label htmlFor="transfer-form-field-value">
					Digite o valor da transferência
					<PrimaryInput
						id="transfer-form-field-value"
						type="number"
						placeholder="0.00"
						name="value"
						value={transfer.value}
						onChange={handleTransferData}
						spellCheck={false}
					/>
				</label>
			</fieldset>
			<footer>
				<PrimaryButton
					onClick={handleTransferSubmit}
				>
					{ isLoading ? <Loading size="50" color={"#FFFFFF"} /> : "Enviar Transferência"}
				</PrimaryButton>
				<TextMedium style={{ color: "red" }}>{errorRequest}</TextMedium>
			</footer>
		</form>
	);
}
