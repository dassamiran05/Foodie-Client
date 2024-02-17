import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userToken } = useSelector((state) => state.auth);
  let location = useLocation();

  if (!userToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
