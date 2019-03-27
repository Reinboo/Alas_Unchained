import React from 'react';
import styled from 'styled-components';

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseUi from 'firebaseui';

const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: window.location.pathname,
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
};


export default class Auth extends React.Component {
    static firebaseUiDeleted = Promise.resolve();

    componentDidMount() {
        Auth.firebaseUiDeleted.then(() => {
          this.ui = new firebaseUi.auth.AuthUI(firebase.auth());
          this.ui.start('#auth', uiConfig);
        })
    }

    componentWillUnmount() {
        Auth.firebaseUiDeleted = this.ui.delete();
    }

    render() {
        return(
            <AuthWrapper id="auth" />
        );
    }
}

const AuthWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;