import { Navigate } from "react-router-dom";
import { useAuthState } from "../store/useAuthStore";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { authUser, checkAuth } = useAuthState();


  useEffect(() => {
    console.log("bye")
    if (!authUser) checkAuth();
  }, [authUser, checkAuth]);


  

  if (!authUser) {

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
