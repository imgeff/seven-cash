import { Route, Routes } from "react-router-dom";
import { GlobalContextProvider } from "./contexts/Global/GlobalContextProvider";
import { routes } from "./routes";

function App() {
	return (
		<GlobalContextProvider>
			<Routes>
				{ routes.map(({ path, element }) => (
					<Route key={path} path={path} element={element}/>
				))}
			</Routes>
		</GlobalContextProvider>
	);
}

export default App;
