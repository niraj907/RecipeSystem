// import { Navigate } from "react-router-dom";
// import { useAuthStore } from './components/store/authStore.js'

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuthStore();
//   return isAuthenticated ? children : <Navigate to="/login" />;
  
// };

// export default ProtectedRoute;




import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check if user is authenticated

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;




