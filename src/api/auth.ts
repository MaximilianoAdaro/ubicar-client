import { useMutation, useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { User } from "../entities/entities";

export type SignUpReq = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDay: Date;
  userType: string;
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
    >("register", data);
    return signUpRes;
  });
};

export type SignInReq = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  return useMutation<User, Error, SignInReq>(async (data) => {
    const { data: signInRes } = await axios.post<
      SignInReq,
      AxiosResponse<User>
    >("login", data);
    console.log(signInRes);
    return signInRes;
  });
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
      const { data } = await axios.get<User>("users/me");
      return data;
    },
    {
      retry: false,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      // refetchOnReconnect: false,
      retryOnMount: false,
    }
  );
};
