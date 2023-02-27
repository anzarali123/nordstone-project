import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const RequireAuth = ({ children }) => {
  const { user } = useContext(UserContext);
  if (user) return children;
  else return <Navigate to="/login" />;
};

export default RequireAuth;
