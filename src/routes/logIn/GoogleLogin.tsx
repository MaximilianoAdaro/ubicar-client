import React, { memo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import axios, { AxiosResponse } from "axios";
import "./firebaseui-styling.global.scss";
import { actions, useAppDispatch, useAppSelector } from "../../store";
import { User } from "../../entities/entities";
import {
  selectIsAuthenticated,
  selectRedirectPath,
} from "../../store/slices/session";

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
  const dispatch = useAppDispatch();
  const redirectPath = useAppSelector(selectRedirectPath);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    // componentDidMount
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (firebaseUser) => {
        console.log({ firebaseUser });
        if (firebaseUser === null || isAuthenticated) {
          return;
        }

        const idToken = await firebaseUser.getIdToken(true);
        console.log({ idToken });

        const config = { headers: { Authorization: idToken } };
        try {
          const { data: user } = await axios.post<void, AxiosResponse<User>>(
            `/google-login`,
            { name: firebaseUser.displayName, email: firebaseUser.email },
            config
          );

          dispatch(actions.session.setUser(user));
          history.push(redirectPath);
        } catch (e) {}
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
