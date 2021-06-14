import { useMutation, useQueryClient } from "react-query";
import {
  GoogleLoginUserDTO,
  LogInUserDTO,
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
  return useMutation(
    async (data: UserCreationDTO) => (await registerUsingPOST(data)) as UserDTO
  );
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: LogInUserDTO) => (await loginUsingPOST(data)) as UserDTO,
    {
      onSuccess(user) {
        queryClient.setQueryData(getGetLoggedUsingGETQueryKey(), user);
      },
    }
  );
};

export const useGoogleSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ token, data }: { token: string; data: GoogleLoginUserDTO }) =>
      (await loginWithGoogleUsingPOST(data, {
        headers: {
          Authorization: token,
        },
      })) as UserDTO,
    {
      onSuccess(user) {
        queryClient.setQueryData(getGetLoggedUsingGETQueryKey(), user);
      },
    }
  );
};

export const useLogOut = () => {
  const queryClient = useQueryClient();
  return useMutation(() => logOutUsingPOST(), {
    onSuccess() {
      queryClient.setQueryData(getGetLoggedUsingGETQueryKey(), null);
    },
  });
};
