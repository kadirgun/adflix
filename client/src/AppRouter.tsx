import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Signup from "./pages/auth/Signup";

const AppRouter = createBrowserRouter([
	{
		path: "/",
		element: (
			<AuthenticatedRoute>
				<Home />
			</AuthenticatedRoute>
		),
	},
	{
		path: "/auth/login",
		element: <Login />,
	},
	{
		path: "/auth/signup",
		element: <Signup />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

export default AppRouter;
