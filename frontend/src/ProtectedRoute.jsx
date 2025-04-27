import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = Cookies.get("token"); 
  console.log("Token from Cookies:", token); 
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;





// import { Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// export const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();
//   if (!user) {
//     // user is not authenticated
//     return <Navigate to="/login" />;
//   }
//   return children;
// };