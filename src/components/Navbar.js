//navbar includes image, username and button
import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();
  const isUser = isAuthenticated && user; //if user authenticated through the Auth0 and if user exist

  return (
    <Wrapper>
      {/* if the isUser is true and user picture exist then bring the image*/}
      {isUser && user.picture && <img src={user.picture} alt={user.name} />}
      {/* work on the username*/}
      {isUser && user.name && (
        <h4>
          Welcome, <strong>{user.name.toUpperCase()}</strong>
        </h4>
      )}
      {/* if the isUser is true we want to display the logout button, if not, we want to display the login button*/}
      {isUser ? (
        <button
          onClick={() => {
            logout({ returnTo: window.location.origin });
          }}
        >
          logout
        </button>
      ) : (
        <button onClick={loginWithRedirect}>login</button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;

export default Navbar;
