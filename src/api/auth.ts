import { useMutation, useQuery, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { User } from "../entities/entities";

export type SignUpReq = {
  userName: string;
  email: string;
  password: string;
  birthDay: Date;
  role: string;
};

export type SignUpRes = {
  id: string;
  email: string;
  password: string;
};

export const useSignUp = () => {
  return useMutation<SignUpRes, Error, SignUpReq>(async (data) => {
    const { data: signUpRes } = await axios.post<
      SignUpReq,
      AxiosResponse<SignUpRes>
    >("auth/register", data);
    return signUpRes;
  });
};

export interface Role {
  id: string;
  title: string;
}

export const useGetRoles = () => {
  return useQuery("roles", async () => {
    const { data } = await axios.get<Role[]>("/auth/roles");
    return data;
  });
};

export type SignInReq = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, SignInReq>(
    async (data) => {
      const { data: signInRes } = await axios.post<
        SignInReq,
        AxiosResponse<User>
      >("auth/login", data);
      console.log(signInRes);
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

interface GoogleSignInReq {
  data: {
    name: string;
    email: string;
  };
  idToken: string;
}

export const useGoogleSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation<User, Error, GoogleSignInReq>(
    async ({ idToken, data }) => {
      const { data: signInRes } = await axios.post<void, AxiosResponse<User>>(
        "auth/google-login",
        data,
        {
          headers: { Authorization: idToken },
        }
      );
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

// export type ChangePasswordReq = {
//   id: string;
//   oldPassword: string;
//   newPassword: string;
// };
//
// export type ChangePasswordRes = {};
//
// export const useChangePassword = () => {
//   return useMutation<ChangePasswordRes, Error, ChangePasswordReq>(
//     async (data) => {
//       const { data: changePasswordRes } = await axios.put(
//         "/user/users/editPassword",
//         data
//       );
//       return changePasswordRes;
//     }
//   );
// };

export const useLoggedUser = () => {
  return useQuery<User, Error>(
    "me",
    async () => {
      const { data } = await axios.get<User>("auth/me");
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
  return useMutation<void, Error, void>(
    async () => {
      await axios.post<void>("auth/logout");
    },
    {
      async onSuccess() {
        queryClient.removeQueries("me");
        await queryClient.cancelQueries("me");
      },
    }
  );
};
