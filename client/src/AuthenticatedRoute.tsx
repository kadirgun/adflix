import { Navigate } from "react-router-dom";
import { useAppSelector } from "./slices/store";

const AuthenticatedRoute = ({children}: any) => {
  const isLoggedin = useAppSelector((state) => state.user.isLoggedin);
  return  isLoggedin ? children : <Navigate to="/auth/login" />
}

export default AuthenticatedRoute;