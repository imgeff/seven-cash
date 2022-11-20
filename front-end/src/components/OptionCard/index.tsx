import { LabelHTMLAttributes } from "react";
import "./style.css";

export function OptionCard(props: LabelHTMLAttributes<HTMLLabelElement>) {
	const { children } = props;
	return(
		<label {...props} className="card" id="option-card">
			{children}
		</label>
	);
}
