import { useMutation, useQueryClient } from "react-query";
import {
  GoogleLoginUserDTO,
  LogInUserDTO,
  Unit,
  UserCreationDTO,
  UserDTO,
} from "./generated/endpoints.schemas";
import {
  getGetLoggedUsingGETQueryKey,
  loginUsingPOST,
  loginWithGoogleUsingPOST,
  logOutUsingPOST,
  registerUsingPOST,
} from "./generated/auth-controller/auth-controller";

export const useSignUp = () => {
  return useMutation((data: UserCreationDTO) =>
    registerUsingPOST<UserDTO>(data)
  );
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation((data: LogInUserDTO) => loginUsingPOST<UserDTO>(data), {
    onSuccess(user) {
      queryClient.setQueryData(getGetLoggedUsingGETQueryKey(), user);
    },
  });
};

export const useGoogleSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ token, data }: { token: string; data: GoogleLoginUserDTO }) =>
      loginWithGoogleUsingPOST<UserDTO>(data, {
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
  return useMutation(() => logOutUsingPOST<Unit>(), {
    onSuccess() {
      queryClient.setQueryData(getGetLoggedUsingGETQueryKey(), undefined);
    },
  });
};
