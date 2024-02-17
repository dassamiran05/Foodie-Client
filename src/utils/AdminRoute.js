import React from "react";
// import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { userToken, userInfo } = useSelector((state) => state.auth);
  let location = useLocation();

  if (!userToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return userInfo.role === 1 ? (
    children ? (
      children
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
