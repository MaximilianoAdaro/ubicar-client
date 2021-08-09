import firebase from "firebase";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  useRegisterUsingPOST,
  useLoginUsingPOST,
  getGetLoggedUsingGETQueryKey,
  GoogleLoginUserDTO,
  loginWithGoogleUsingPOST,
  useLogOutUsingPOST,
} from "..";

export const useSignUp = () => {
  return useRegisterUsingPOST();
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useLoginUsingPOST({
    mutation: {
      onSuccess(user) {
        queryClient.setQueryData(getGetLoggedUsingGETQueryKey(), user);
      },
      onError() {
        toast.error("❌ Error al iniciar sesion!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      },
    },
  });
};

export const useGoogleSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ token, data }: { token: string; data: GoogleLoginUserDTO }) =>
      loginWithGoogleUsingPOST(data, {
        headers: {
          Authorization: token,
        },
      }),
    {
      onSuccess(user) {
        queryClient.setQueryData(getGetLoggedUsingGETQueryKey(), user);
      },
      async onError() {
        await firebase.auth().signOut();
        toast.error("❌ Error al iniciar sesion!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      },
    }
  );
};

export const useLogOut = () => {
  const queryClient = useQueryClient();
  return useLogOutUsingPOST({
    mutation: {
      onSuccess() {
        queryClient.setQueryData(getGetLoggedUsingGETQueryKey(), undefined);
      },
    },
  });
};
