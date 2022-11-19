import "./style.css";
import logoNGBlack from "../../images/logo_ng_black.png";
import { UserForm } from "../../components/UserForm";
import { IUser } from "../../components/UserForm/interfaces/IUser";
import { SetState } from "../../components/UserForm/interfaces/IUserFormProps";
import { setItemLocalStorage } from "../../helpers/localstorage";
import { requestRegister } from "../../services/requests/user";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Register() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	async function handleRegister(data: IUser, setErrorRequest: SetState) {
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
				isLoading={isLoading}
				colorLoading="#FFFFFF"
			/>
		</section>
	);
}
