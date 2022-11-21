import "./style.css";
import { Eye, EyeSlash } from "phosphor-react";
import { useState, useContext } from "react";
import { AccountContext } from "../../contexts/Account";
import { HeadingMedium } from "../../subcomponents/Headings";

export function BalanceCard() {
	const [displayBalance, setDisplayBalance] = useState(false);
	const { balance } = useContext(AccountContext);

	function handleBalanceDisplay() {
		setDisplayBalance(!displayBalance);
	}

	return (
		<article className="card" id="balance-card">
			<HeadingMedium>Saldo da Conta</HeadingMedium>
			<footer>
				{displayBalance ? `R$ ${balance.toFixed(2)}` : "R$ *****"}
				<span
					className="daisy-tooltip"
					data-tip={displayBalance ? "Esconder Saldo" : "Mostrar Saldo"}
				>
					{displayBalance ? (
						<Eye
							size={24}
							weight="duotone"
							color="#525252"
							onClick={handleBalanceDisplay}
						/>) : (
						<EyeSlash
							size={24}
							weight="duotone"
							color="#525252"
							onClick={handleBalanceDisplay}
						/>
					)}
				</span>
			</footer>
		</article>
	);
}
