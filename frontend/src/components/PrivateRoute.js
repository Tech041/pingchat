import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { authUser } = useContext(AppContext);

  return authUser ? children : navigate("/login");
};

export default PrivateRoute;
