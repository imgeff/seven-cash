import "./style.css";
import { useContext } from "react";
import { AccountContext } from "../../contexts/Account";
import { HeadingLarge } from "../../subcomponents/Headings";

export function WelcomeCard() {
	const { user } = useContext(AccountContext);

	return(
		<article className="card" id="welcome-card">
			<HeadingLarge>{`Seja Bem Vindo(a) ${user.username} !`}</HeadingLarge>
		</article>
	);
}
