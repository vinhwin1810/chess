import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken");

  if (!isAuthenticated) {
    // User not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  // User authenticated, allow access to the route
  return children;
};

export default ProtectedRoute;
