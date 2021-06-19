import { useMutation, useQueryClient } from "react-query";
import {
  getGetLoggedUsingGETQueryKey,
  loginWithGoogleUsingPOST,
  useLoginUsingPOST,
  useLogOutUsingPOST,
  useRegisterUsingPOST,
} from "./generated/auth-controller/auth-controller";
import { GoogleLoginUserDTO } from "./generated/endpoints.schemas";

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
