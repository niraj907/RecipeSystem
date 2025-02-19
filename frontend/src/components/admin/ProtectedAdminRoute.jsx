import React from 'react'
import { Navigate } from "react-router-dom";
import useAdminStore from '@/components/admin/adminStore.js';


const ProtectedAdminRoute = () => {
    const { isAuthenticated } = useAdminStore();
  
    return isAuthenticated ? children : <Navigate to="/admin-login" />;
  
}

export default ProtectedAdminRoute