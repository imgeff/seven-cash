import React from "react";
import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalContextProvider } from "../../../contexts/Global/GlobalContextProvider";

const RegisterProviders: FC<{children: React.ReactNode}> = ({children}) => {
	return (
		<BrowserRouter>
			<GlobalContextProvider>
				<Routes>
					<Route path="/register" element={children} />
				</Routes>
			</GlobalContextProvider>
		</BrowserRouter>
	);
};

export { RegisterProviders };
