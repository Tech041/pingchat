import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { authUser } = useContext(AppContext);

  return authUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
