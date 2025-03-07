import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken"); // Check if user is authenticated

  return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
};

export default ProtectedAdminRoute;
