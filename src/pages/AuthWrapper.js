//we should wrap all the Routes (pages) in the App.js in the AuthWrapper since after logged in Auth0 we still see the login page and not going to the dashboard page)
//read: https://auth0.com/docs/libraries/auth0-react#isloading-and-error (isLoading and error section)
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import loadingGif from "../images/preloader.gif";
import styled from "styled-components";

function AuthWrapper({ children }) {
  //we are accessing the children which are all the pages (Route) in the App.js
  const { isLoading, error } = useAuth0();
  //check if loading is true (if we are loading)
  //this is the second place we are using loading spinner (we are in the on login page and we want to go to the dashboard page after login)
  if (isLoading) {
    return (
      <Wrapper>
        <img sr={loadingGif} alt="spinner" />
      </Wrapper>
    );
  }
  //if error is true
  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    );
  }
  return <>{children}</>; //if everything is correct then return children
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 150px;
  }
`;

export default AuthWrapper;
