import React from "react";
import { ButtonHTMLAttributes } from "react";
import "./style.css";

export function PrimaryButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
	const { children } = props;
	return (
		<button
			className="primary-button"
			type="button"
			{...props}
		>
			{children}
		</button>
	);
}

export function SecondaryButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
	const { children } = props;
	return (
		<button
			className="secondary-button"
			type="button"
			{...props}
		>
			{children}
		</button>
	);
}

export function DropButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
	const { children } = props;
	return (
		<button
			className="drop-button"
			type="button"
			{...props}
		>
			{children}
		</button>
	);
}
