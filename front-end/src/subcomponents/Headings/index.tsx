import { HTMLAttributes } from "react";
import "./style.css";

export function HeadingLarge(props: HTMLAttributes<HTMLHeadingElement>) {
	const { children } = props;
	return (
		<h1
			className="heading-large"
			{...props}
		>
			{children}
		</h1>
	);
}

export function HeadingMedium(props: HTMLAttributes<HTMLHeadingElement>) {
	const { children } = props;
	return (
		<h2
			className="heading-medium"
			{...props}
		>
			{children}
		</h2>
	);
}

export function HeadingSmall(props: HTMLAttributes<HTMLHeadingElement>) {
	const { children } = props;
	return (
		<h3
			className="heading-small"
			{...props}
		>
			{children}
		</h3>
	);
}
