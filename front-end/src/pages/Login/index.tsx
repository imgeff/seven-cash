import React from "react";
import "./style.css";
import Logo from "../../images/logo_white.png";
import { UserForm } from "../../components/UserForm";
import { IUser } from "../../components/UserForm/interfaces/IUser";
import { setItemLocalStorage } from "../../helpers/Localstorage";
import { requestLogin } from "../../services/requests/User";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SetState } from "../../types/SetState";
import { GlobalContext } from "../../contexts/Global";

export function Login() {
	const navigate = useNavigate();
	const { loading: { setIsLoading } } = useContext(GlobalContext);

	async function handleLogin(data: IUser, setErrorRequest: SetState<string>) {
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
				<img src={Logo} alt="Logotipo da SEVEN" />
			</header>
			<UserForm
				textSubmit="Entrar na Plataforma"
				textNavigate="Ainda não tem conta? Crie aqui :)"
				handleSubmit={handleLogin}
				handleNavigation={handleNavigation}
				colorLoading="#000000"
			/>
		</section>
	);
}
