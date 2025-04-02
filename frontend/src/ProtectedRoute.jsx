import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = Cookies.get("token"); 
  console.log("Token from Cookies:", token); 
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;