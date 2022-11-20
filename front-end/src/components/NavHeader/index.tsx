import "./style.css";
import logoNG from "../../images/logo_ng.png";
import { SignOut } from "phosphor-react";

export function NavHeader() {
	return(
		<header id="nav-header">
			<figure>
				<img src={logoNG} alt="Logotipo da NG.Cash" />
			</figure>
			<nav>
				<span className="daisy-tooltip daisy-tooltip-right" data-tip="Sair">
					<SignOut size={30} weight="bold" color="red" />
				</span>
			</nav>
		</header>
	);
}
