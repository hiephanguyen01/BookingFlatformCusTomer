import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export const ProtectedRouter = ({ children }) => {
  const user = useSelector((state) => state.authenticateReducer.currentUser);
  const authing = useSelector((state) => state.authenticateReducer.authing);
  return authing ? <p></p> : !user ? <Navigate to="/auth/sign-in" /> : children;
};
