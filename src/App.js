import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch, } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import styled from 'styled-components';

import './static/App.css';
import config from './static/firebase.config';
import Auth from "./Auth";
import Header from './Components/Header';
import Loader from './Components/Loader';

import ArticleContainer from './Components/Containers/ArticleContainer';
import AssignmentContainer from './Components/Containers/AssignmentContainer';
import DashboardContainer from './Components/Containers/DashboardContainer';
import NewArticleContainer from './Components/Containers/NewArticleContainer';
import NewAssignmentContainer from './Components/Containers/NewAssignmentContainer';
import UserInfoContainer from './Components/Containers/UserInfoContainer'

firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      isAdmin: false,
      isNewUser: false,
      currentUser: {},
      loggedOut: false,
      showUserInfo: window.innerWidth > 650 || window.location.hash === '#/',
    };

    this.checkAuth = this.checkAuth.bind(this);
    this.setShowUserInfo = this.setShowUserInfo.bind(this);
  }

  componentDidMount() {
    return this.checkAuth();
  }

  setShowUserInfo() {
    if (window.innerWidth > 650 || window.location.hash === '#/') {
      this.setState({
        showUserInfo: true
      })
    } else if (this.state.showUserInfo) {
      this.setState({
        showUserInfo: false
      })
    }
  }

  checkAuth() {
    const slug = window.location.pathname.slice(1,-1);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref('/users')
          .child(user.uid)
          .once('value')
          .then((snapshot) => {
            const userData = snapshot.val();
            if (userData && userData.slug === slug){
              this.setState({
                isAdmin: true,
              });
            }

            this.setState({
              currentUser: user,
              isLoggedIn: true,
            });
        });
      } else {
        // User is signed out.
        this.setState({
          isAdmin: false,
          isLoggedIn: false,
          currentUser: {},
          stopLoader: true,
        });
      }
    });
  }

  render() {
    const {
      stopLoader,
      currentUser,
      isLoggedIn,
      isAdmin,
      showUserInfo,
    } = this.state;


    if (stopLoader || isLoggedIn) {
      const curtain = document.getElementById('curtain');

      if (curtain) {
        document.getElementById('curtain').remove();
      }
      return (
        <Router >
            <Wrapper id="main-wrapper">
              <Header isLoggedIn={isLoggedIn}/>
              {showUserInfo
                ? <UserInfoContainer user={currentUser} isAdmin={isAdmin} />
                : null
              }
              <Content id="main-container">
                <Switch>
                  <PropsRoute exact path='/' component={DashboardContainer} toggleUserInfo={this.setShowUserInfo} isAdmin={isAdmin} />
                  <PropsRoute path='/articles/:articleName' component={ArticleContainer} isAdmin={isAdmin}/>
                  <PropsRoute path='/assignments/:assignmentName' component={AssignmentContainer} assignmentType='assignments'/>
                  <PropsRoute path='/reports/:assignmentName' component={AssignmentContainer} assignmentType='reports' />
                  <PropsRoute exact path='/newArticle' component={NewArticleContainer} isAdmin={isAdmin}/>
                  <PropsRoute exact path='/newAssignment' component={NewAssignmentContainer} assignmentType='assignments' isAdmin={isAdmin}/>
                  <PropsRoute exact path='/newReport' component={NewAssignmentContainer} assignmentType='reports' isAdmin={isAdmin}/>
                  <Route path='/auth' component={Auth} />
                </Switch>
              </Content>
            </Wrapper>
        </Router>
      );
    }

    return (
      <Loader />
    );
  }
}

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
};

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
};

/* ~~~~~~~ STYLED COMPONENTS ~~~~~~~ */
const Wrapper = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: minmax(250px, 20vw) auto;
    grid-template-rows: 50vh auto;
    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
      grid-template-rows: 4rem auto;
      grid-row-gap: 15px;
    }
    
    @media (max-width: 650px) {
      grid-template-rows: minmax(0, auto) 1fr;
    }
    
    grid-column-gap: 15px;
    margin-top: 50px;
    
    color: azure;
`;

const Content = styled.div`
  overflow-y: auto;
  max-height: calc( 100% - 80px );
  margin: 15px;
  padding: 15px;
  background: rgba(44, 48, 55, .7);
  border: 1px solid lightgray;
  grid-row: 1/3;
  grid-column: 2/3;
  
  @media (max-width: 1000px) {
    grid-row: 2/3;
    grid-column: 1/2;
  }
  text-align: center;
  
  &>section {
    text-align: left;
    margin: 0 35px;
  }
  
  figure {
    text-align: center;
    
    img {
      max-width: 50vw;
      max-height: 50vh;
    }
  }
`;
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
export default App;
