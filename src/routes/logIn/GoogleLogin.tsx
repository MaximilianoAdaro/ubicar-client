import React, { memo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./firebaseui-styling.global.scss";
import { actions, useAppDispatch, useAppSelector } from "../../store";
import {
  selectIsAuthenticated,
  selectRedirectPath,
} from "../../store/slices/session";
import { useGoogleSignIn } from "../../api/auth";

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

  const { mutateAsync: googleLogIn } = useGoogleSignIn();

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

        try {
          const user = await googleLogIn({
            data: {
              name: firebaseUser.displayName ?? "",
              email: firebaseUser.email ?? "",
            },
            idToken,
          });

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
