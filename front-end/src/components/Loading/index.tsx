import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { ILoadingProps } from "./interfaces/ILoadingProps";

export function Loading({ size, color }: ILoadingProps) {
	return (
		<ThreeDots
			height={size}
			width={size}
			radius="9"
			color={color}
			ariaLabel="three-dots-loading"
			visible={true}
		/>
	);
}
