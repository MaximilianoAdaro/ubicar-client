import React, { memo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import axios from "axios";
import { baseUrl } from "../../api/config";
import "./firebaseui-styling.global.scss";

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Email and Google as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

export function GoogleLogin() {
  const history = useHistory();

  useEffect(() => {
    // componentDidMount
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((firebaseUser) => {
        if (firebaseUser !== null) {
          firebase
            .auth()
            .currentUser.getIdToken(true)
            .then((idToken) => {
              const config = { headers: { Authorization: idToken } };
              axios
                .post(
                  `${baseUrl}/google-login`,
                  { name: firebaseUser.displayName, email: firebaseUser.email },
                  config
                )
                .then(() => {
                  history.push("/");
                });
            });
        }
      });

    // componentWillUnmount
    return () => unregisterAuthObserver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default memo(GoogleLogin);
