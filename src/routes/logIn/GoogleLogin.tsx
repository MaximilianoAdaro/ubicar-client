import { memo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import "./firebaseui-styling.global.scss";
import { useAppSelector } from "../../store";
import { selectRedirectPath } from "../../store/slices/session";
import { useGoogleSignIn } from "../../api/auth";
import { useGetLoggedUsingGET } from "../../api/generated/auth-controller/auth-controller";
import { FirebaseAuth } from "react-firebaseui";

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
  const redirectPath = useAppSelector(selectRedirectPath);

  const { data: user } = useGetLoggedUsingGET();
  const { mutateAsync: googleSignIn } = useGoogleSignIn();

  useEffect(() => {
    // componentDidMount
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser === null || !!user) {
          return;
        }

        const idToken = await firebaseUser.getIdToken(true);

        try {
          await googleSignIn({
            data: {
              name: firebaseUser.displayName ?? "",
              email: firebaseUser.email ?? "",
            },
            token: idToken,
          });
          history.push(redirectPath);
        } catch (e) {}
      });

    // componentWillUnmount
    return () => unregisterAuthObserver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <FirebaseAuth
        uiCallback={(ui) => ui.disableAutoSignIn()}
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
    </div>
  );
}

export default memo(GoogleLogin);
