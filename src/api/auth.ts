import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  AuthControllerApi,
  GoogleLoginUserDTO,
  LogInUserDTO,
  UserCreationDTO,
} from "../generated/api";

const authControllerApi = new AuthControllerApi(undefined, "");

export const useSignUp = () => {
  return useMutation(async (data: UserCreationDTO) => {
    const { data: signUpRes } = await authControllerApi.registerUsingPOST(data);
    return signUpRes;
  });
};

export const useGetRoles = () => {
  return useQuery("roles", async () => {
    const { data } = await authControllerApi.getRolesUsingGET();
    return data;
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: LogInUserDTO) => {
      const { data: signInRes } = await authControllerApi.loginUsingPOST(data);
      return signInRes;
    },
    {
      async onSuccess() {
        queryClient.removeQueries("me");
        await queryClient.cancelQueries("me");
      },
    }
  );
};

export const useGoogleSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ token, data }: { token: string; data: GoogleLoginUserDTO }) => {
      const {
        data: signInRes,
      } = await authControllerApi.loginWithGoogleUsingPOST(token, data);
      return signInRes;
    },
    {
      async onSuccess() {
        queryClient.removeQueries("me");
        await queryClient.cancelQueries("me");
      },
    }
  );
};

export const useLoggedUser = () => {
  return useQuery(
    "me",
    async () => {
      const { data } = await authControllerApi.getLoggedUsingGET();
      return data;
    },
    {
      retry: false,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retryOnMount: false,
      refetchIntervalInBackground: false,
    }
  );
};

export const useLogOut = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      await authControllerApi.logOutUsingPOST();
    },
    {
      async onSuccess() {
        queryClient.removeQueries("me");
        await queryClient.cancelQueries("me");
      },
    }
  );
};
