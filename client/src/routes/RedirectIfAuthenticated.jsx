import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const RedirectIfAuthenticated = ({ children }) => {
  const [auth] = useAuth();

  if (auth?.token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RedirectIfAuthenticated;
