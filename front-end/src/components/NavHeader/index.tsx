import "./style.css";
import logoNG from "../../images/logo_ng.png";
import { SignOut } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { removeItemLocalStorage } from "../../helpers/Localstorage";

export function NavHeader() {
	const navigate = useNavigate();

	function handleLogOut() {
		removeItemLocalStorage("user");
		navigate("/login");
	}

	return(
		<header id="nav-header">
			<figure>
				<img src={logoNG} alt="Logotipo da NG.Cash" />
			</figure>
			<nav>
				<span className="daisy-tooltip daisy-tooltip-right" data-tip="Sair">
					<SignOut size={30} weight="bold" color="red" onClick={handleLogOut} />
				</span>
			</nav>
		</header>
	);
}
