import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";

const AppRouter = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/auth/login",
		element: <Login />,
	},
	{
		path: "/auth/signup",
		element: <Login />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

export default AppRouter;
