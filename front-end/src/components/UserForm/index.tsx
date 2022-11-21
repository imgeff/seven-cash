import "./style.css";
import { PrimaryInput } from "../../subcomponents/Inputs";
import { PrimaryButton, SecondaryButton } from "../../subcomponents/Buttons";
import { useContext, useEffect, useState } from "react";
import { TextMedium } from "../../subcomponents/Texts";
import { IUserFormProps } from "./interfaces/IUserFormProps";
import { Loading } from "../Loading";
import { Eye, EyeSlash } from "phosphor-react";
import { GlobalContext } from "../../contexts/Global";

interface IEventTarget {
	target: {
		name: string;
		value: string;
	}
}

export function UserForm({
	textSubmit,
	handleSubmit,
	textNavigate,
	handleNavigation,
	colorLoading,
}: IUserFormProps) {
	const [user, setUser] = useState({ username: "", password: "" });
	const [disabledButton, setDisabledButton] = useState(true);
	const [errorMessages, setErrorMessages] = useState({ username: "", password: "" });
	const [errorRequest, setErrorRequest] = useState("");
	const [displayPassword, setDisplayPassword] = useState(false);
	const { loading: { isLoading } } = useContext(GlobalContext);

	function handleUserData({ target: { name, value } }: IEventTarget) {
		setUser({ ...user, [name]: value });
	}

	function submitMustBeDisabled() {
		const { username, password } = user;
		const validatePassword = new RegExp("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}");
		if (username && username.length < 3) {
			const usernameErrorMessage = "O nome de usuário deve ter pelo menos 3 caracteres";
			setErrorMessages({...errorMessages, username: usernameErrorMessage});
			return true;
		} else if (password && !validatePassword.test(password)) {
			const passwordErrorMessage = "A senha deve ter pelo menos 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 número";
			setErrorMessages({username: "", password: passwordErrorMessage});
			return true;
		} else if (!username || !password) {
			setErrorMessages({ username: "", password: ""});
			return true;
		}

		setErrorMessages({ username: "", password: ""});
		return false;
	}

	function handleButtonActivation() {
		setDisabledButton(submitMustBeDisabled());
	}

	function handlePasswordDisplay() {
		setDisplayPassword(!displayPassword);
	}

	useEffect(() => {
		if (user.username || user.password) {
			handleButtonActivation();
		} else {
			setErrorMessages({ username: "", password: ""});
		}
	}, [user]);

	return(
		<form className="form-y-center" id="userform">
			<fieldset id="userform-fields">
				<label htmlFor="userform-field-username">
					Digite seu nome de usuário
					<PrimaryInput
						id="userform-field-username"
						placeholder="username"
						name="username"
						value={user.username}
						onChange={handleUserData}
						spellCheck={false}
					/>
					<TextMedium style={{ color: "red" }}>{errorMessages.username}</TextMedium>
				</label>
				<label htmlFor="userform-field-password">
					Digite sua senha
					<PrimaryInput
						id="userform-field-password"
						placeholder="* * * * * * * * *"
						type={ displayPassword ? "text" : "password" }
						name="password"
						value={user.password}
						onChange={handleUserData}
						spellCheck={false}
					/>
					<span
						id="toggle-password-display"
						className="daisy-tooltip"
						data-tip={displayPassword ? "Esconder Senha" : "Mostrar Senha"}
					>
						{ displayPassword ? (
							<Eye
								size={24}
								weight="duotone"
								color="#565656"
								onClick={handlePasswordDisplay}
							/>) : (
							<EyeSlash
								size={24}
								weight="duotone"
								color="#565656"
								onClick={handlePasswordDisplay}
							/>
						)}
					</span>
					<TextMedium style={{ color: "red" }}>{errorMessages.password}</TextMedium>
				</label>
			</fieldset>
			<footer>
				<PrimaryButton
					disabled={disabledButton}
					onClick={() => handleSubmit(user, setErrorRequest)}
				>
					{ isLoading ? <Loading size="50" color={colorLoading} /> : textSubmit}
				</PrimaryButton>
				<TextMedium style={{ color: "red" }}>{errorRequest}</TextMedium>
				<SecondaryButton onClick={handleNavigation}>{textNavigate}</SecondaryButton>
			</footer>
		</form>
	);
}
