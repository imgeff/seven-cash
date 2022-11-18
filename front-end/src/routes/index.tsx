import { IRoute } from "./interfaces/IRoute";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Main } from "../pages/Main";

export const routes: IRoute[] = [
	{
		path: "/login",
		element: <Login />
	},
	{
		path: "/register",
		element: <Register />
	},
	{
		path: "/",
		element: <Main />
	}
];