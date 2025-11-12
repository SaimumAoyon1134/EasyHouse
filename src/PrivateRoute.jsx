import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const notify = () => toast("Must Have to login for this!!");
  const location = useLocation();
  if (isLoading) {
    return (
      <div className="flex text-center justify-center h-[600px]">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
