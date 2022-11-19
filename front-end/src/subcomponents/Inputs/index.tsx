import { InputHTMLAttributes } from "react";
import "./style.css";

export function PrimaryInput(props: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			className="primary-input"
			{...props}
		/>
	);
}
