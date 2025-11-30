import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthState(); 

  if (!authUser) {
    
    return <Navigate to="/login" replace />;
  }


  return children;
};

export default ProtectedRoute;
