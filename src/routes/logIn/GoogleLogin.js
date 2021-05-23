import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import {useHistory} from "react-router-dom";
import {
    Alert,
    Container,
} from 'reactstrap';
import { compose } from 'redux';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from "axios";
import {baseUrl} from "../../api/config";

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Email and Google as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
};

export function GoogleLogin({ loading, error  }) {

    const [isSignedIn, setSignedIn] = useState(false);
    const history = useHistory();

    useEffect(() => {
        // componentDidMount
        const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged(firebaseUser => {
                setSignedIn(!!firebaseUser);
                if (firebaseUser !== null) {
                    firebase
                        .auth()
                        .currentUser
                        .getIdToken(true)
                        .then(idToken => {
                            const config = {headers: {Authorization: idToken}}
                            axios.post(`${baseUrl}/google-login`, {name: firebaseUser.displayName, email: firebaseUser.email}, config)
                                .then(() => {
                                    history.push('/')
                                })
                        });
                }
            });

        // componentWillUnmount
        return () => {
            unregisterAuthObserver();
        };
    }, []);

    return (
        <div>
            <Container className="mt-3" fluid>
                {loading ? (
                    <Alert color="info">Loading...</Alert>
                ) : (
                    <div>
                        {!isSignedIn && (
                            <>
                                <StyledFirebaseAuth
                                    uiConfig={uiConfig}
                                    firebaseAuth={firebase.auth()}
                                />
                            </>
                        )}
                    </div>
                )}
            </Container>
        </div>
    );
}

GoogleLogin.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
};

export default compose(
    memo,
)(GoogleLogin);
