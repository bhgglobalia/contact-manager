import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { ReactElement } from "react";

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps): ReactElement => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
