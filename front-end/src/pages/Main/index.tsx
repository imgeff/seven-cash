import "./style.css";
import { Swap, Users } from "phosphor-react";
import { BalanceCard } from "../../components/BalanceCard";
import { NavHeader } from "../../components/NavHeader";
import { OptionCard } from "../../components/OptionCard";
import { WelcomeCard } from "../../components/WelcomeCard";
import { TransferModal } from "../../components/TransferModal";
import { TextLarge } from "../../subcomponents/Texts";
import { AccountContextProvider } from "../../contexts/Account/AccountContextProvider";
import { useContext } from "react";
import { AccountContext } from "../../contexts/Account";
import { TransactionModal } from "../../components/TransactionModal";

export function Main() {
	const { errorRequest } = useContext(AccountContext);

	return (
		<AccountContextProvider>
			<section id="main">
				<NavHeader />
				<div id="account-content">
					<div id="account-balance">
						<WelcomeCard />
						<BalanceCard />
					</div>
					<div id="account-options">
						<OptionCard htmlFor="transfer-modal-check">
							<Users size={50} weight="duotone" color="#FFFFFF" />
							<TextLarge>Transferir</TextLarge>
						</OptionCard>
						<OptionCard htmlFor="transaction-modal-check">
							<Swap size={50} weight="duotone" color="#FFFFFF" />
							<TextLarge>Transações</TextLarge>
						</OptionCard>
					</div>
					<TransferModal />
					<TransactionModal />
					<TextLarge style={{ color: "red" }}>{errorRequest}</TextLarge>
				</div>
			</section>
		</AccountContextProvider>
	);
}
