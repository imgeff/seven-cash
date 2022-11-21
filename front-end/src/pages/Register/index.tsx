import "./style.css";
import logoNGBlack from "../../images/logo_ng_black.png";
import { UserForm } from "../../components/UserForm";
import { IUser } from "../../components/UserForm/interfaces/IUser";
import { setItemLocalStorage } from "../../helpers/Localstorage";
import { requestRegister } from "../../services/requests/User";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SetState } from "../../types/SetState";
import { GlobalContext } from "../../contexts/Global";

export function Register() {
	const navigate = useNavigate();
	const { loading: { setIsLoading } } = useContext(GlobalContext);

	async function handleRegister(data: IUser, setErrorRequest: SetState<string>) {
		setIsLoading(true);
		const response = await requestRegister(data);
		setIsLoading(false);
		if (typeof response === "string") {
			setErrorRequest(response);
		} else {
			setItemLocalStorage("user", response);
			navigate("/");
		}
	}

	function handleNavigation() {
		navigate("/login");
	}

	return (
		<section className="userform-area" id="register">
			<header>
				<img src={logoNGBlack} alt="Logotipo da NG.Cash" />
			</header>
			<UserForm
				textSubmit="Criar Conta"
				textNavigate="Voltar Para a Página de Login"
				handleSubmit={handleRegister}
				handleNavigation={handleNavigation}
				colorLoading="#FFFFFF"
			/>
		</section>
	);
}
