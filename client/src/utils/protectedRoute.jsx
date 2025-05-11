import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext"; 

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
