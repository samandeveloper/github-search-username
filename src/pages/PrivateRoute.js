// using react-router-dom@6

//Note: in react-router-dom@6 we don't have Route and Redirect
import React from "react";
import { Navigate } from "react-router-dom"; //in react-router-dom@6 we have Navigate instead of Redirect (in version5)
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  //here children is dashboard page which is our private page
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;
  //if isUser is false
  if (!isUser) {
    return <Navigate to="/login" />;
  }
  //if isUser is true
  return children;
};
export default PrivateRoute;
