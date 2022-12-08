import React from "react";
import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalContextProvider } from "../../../contexts/Global/GlobalContextProvider";

const LoginProviders: FC<{children: React.ReactNode}> = ({children}) => {
	return (
		<BrowserRouter>
			<GlobalContextProvider>
				<Routes>
					<Route path="/login" element={children} />
				</Routes>
			</GlobalContextProvider>
		</BrowserRouter>
	);
};

export { LoginProviders };
