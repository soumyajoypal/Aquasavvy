import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AuthComponent = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  if (!user) {
    return (
      <Navigate to="/login" state={{ path: location.pathname }}></Navigate>
    );
  }
  return children;
};

export default AuthComponent;
