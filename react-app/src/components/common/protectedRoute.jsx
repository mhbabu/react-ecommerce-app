import { Navigate, useLocation } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  return auth.getCurrentUser() ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location }} />
  );
};

export default ProtectedRoute;
