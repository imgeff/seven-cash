import "./style.css";
import logoNG from "../../images/logo_ng.png";
import { UserForm } from "../../components/UserForm";
import { IUser } from "../../components/UserForm/interfaces/IUser";
import { SetState } from "../../components/UserForm/interfaces/IUserFormProps";
import { setItemLocalStorage } from "../../helpers/localstorage";
import { requestLogin } from "../../services/requests/user";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Login() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	async function handleLogin(data: IUser, setErrorRequest: SetState) {
		setIsLoading(true);
		const response = await requestLogin(data);
		setIsLoading(false);
		if (typeof response === "string") {
			setErrorRequest(response);
		} else {
			setItemLocalStorage("user", response);
			navigate("/");
		}
	}

	function handleNavigation() {
		navigate("/register");
	}

	return (
		<section className="userform-area">
			<header>
				<img src={logoNG} alt="Logotipo da NG.Cash" />
			</header>
			<UserForm
				textSubmit="Entrar na Plataforma"
				textNavigate="Ainda não tem conta? Crie aqui :)"
				handleSubmit={handleLogin}
				handleNavigation={handleNavigation}
				isLoading={isLoading}
				colorLoading="#000000"
			/>
		</section>
	);
}
