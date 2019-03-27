import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import styled from 'styled-components';

import SignIn from '../static/sign-in-alt-solid.svg';
import SignOut from '../static/user-solid.svg';

const handleSignOut = () => {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.reload();
  }).catch(function(error) {
    // An error happened.
  });
};

const handleSignIn = () => {
  window.location.hash = "#/auth";
};

const Header = ({ isLoggedIn }) => {
  return (
    <HeaderWrapper>
      <Link to="/">
        <span>ALAS</span>
      </Link>
      {isLoggedIn
        ? <div onClick={handleSignOut}>
            <img src={SignOut} alt=""/>
          </div>
        : <div onClick={handleSignIn}>
            <img src={SignIn} alt=""/>
          </div>
      }
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0; left: 0;
  height: 50px;
  width: 100%;
  
  display: grid;
  grid-template-columns: 1fr 50px;
  
  a {
    text-decoration: none;
    color: white;
    margin: 15px;
    font-family: 'Russo One', sans-serif;
    font-size: 2rem;
  }
  
  div {
    width: 100%; height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    cursor: pointer;
  }
  img {
    height: 2rem;
    align-self: center;
  }
`;

export default Header;
