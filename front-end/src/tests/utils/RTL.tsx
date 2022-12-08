import { FC, ReactElement} from "react";
import {render, RenderOptions} from "@testing-library/react";



const renderWithRouter = (
	ui: ReactElement,
	{route = "/"} = {},
	providers: FC<{children: React.ReactNode}>,
	options?: Omit<RenderOptions, "wrapper">
) => {
	window.history.pushState({}, "Test page", route);

	return {
		...render(ui, {wrapper: providers, ...options}),
	};
};

export * from "@testing-library/react";
export { renderWithRouter };
