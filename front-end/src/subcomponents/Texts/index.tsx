import React from "react";
import { HTMLAttributes } from "react";
import "./style.css";

export function TextLarge(props: HTMLAttributes<HTMLParagraphElement>) {
	const { children } = props;
	return (
		<p
			className="text-large"
			{...props}
		>
			{children}
		</p>
	);
}

export function TextMedium(props: HTMLAttributes<HTMLParagraphElement>) {
	const { children } = props;
	return (
		<p
			className="text-medium"
			{...props}
		>
			{children}
		</p>
	);
}

export function TextSmall(props: HTMLAttributes<HTMLParagraphElement>) {
	const { children } = props;
	return (
		<p
			className="text-small"
			{...props}
		>
			{children}
		</p>
	);
}
