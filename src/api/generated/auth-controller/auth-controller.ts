/*
 * Generated by orval v5.4.8 🍺
 * Do not edit manually.
 * Api Documentation
 * Api Documentation
 * OpenAPI spec version: 1.0
 */
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "react-query";
import type {
  UserDTO,
  GoogleLoginUserDTO,
  LogInUserDTO,
  Unit,
  UserCreationDTO,
  RoleDTO,
} from "../endpoints.schemas";
import { customInstance } from "../../mutator/custom-instance";

type AsyncReturnType<
  T extends (...args: any) => Promise<any>,
  U = unknown
> = T extends (...args: any) => Promise<infer R> ? (U extends R ? U : R) : any;

export type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P
) => any
  ? P
  : never;

export const loginWithGoogleUsingPOST = <TData = UserDTO>(
  googleLoginUserDTO: GoogleLoginUserDTO,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<TData>(
    { url: `/auth/google-login`, method: "post", data: googleLoginUserDTO },
    // eslint-disable-next-line
    // @ts-ignore
    options
  );
};

export const useLoginWithGoogleUsingPOST = <
  TData = AsyncReturnType<typeof loginWithGoogleUsingPOST, UserDTO>,
  TError = unknown,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    TData,
    TError,
    { data: GoogleLoginUserDTO },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options || {};

  return useMutation<TData, TError, { data: GoogleLoginUserDTO }, TContext>(
    (props) => {
      const { data } = props || {};

      return loginWithGoogleUsingPOST<TData>(data, requestOptions);
    },
    mutationOptions
  );
};
export const loginUsingPOST = <TData = UserDTO>(
  logInUserDTO: LogInUserDTO,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<TData>(
    { url: `/auth/login`, method: "post", data: logInUserDTO },
    // eslint-disable-next-line
    // @ts-ignore
    options
  );
};

export const useLoginUsingPOST = <
  TData = AsyncReturnType<typeof loginUsingPOST, UserDTO>,
  TError = unknown,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    TData,
    TError,
    { data: LogInUserDTO },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options || {};

  return useMutation<TData, TError, { data: LogInUserDTO }, TContext>(
    (props) => {
      const { data } = props || {};

      return loginUsingPOST<TData>(data, requestOptions);
    },
    mutationOptions
  );
};
export const logOutUsingPOST = <TData = Unit>(
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<TData>(
    { url: `/auth/logout`, method: "post", data: undefined },
    // eslint-disable-next-line
    // @ts-ignore
    options
  );
};

export const useLogOutUsingPOST = <
  TData = AsyncReturnType<typeof logOutUsingPOST, Unit>,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<TData, TError, TVariables, TContext>;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options || {};

  return useMutation<TData, TError, TVariables, TContext>(() => {
    return logOutUsingPOST<TData>(requestOptions);
  }, mutationOptions);
};
export const getLoggedUsingGET = <TData = UserDTO>(
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<TData>(
    { url: `/auth/me`, method: "get" },
    // eslint-disable-next-line
    // @ts-ignore
    options
  );
};

export const getGetLoggedUsingGETQueryKey = () => [`/auth/me`];

export const useGetLoggedUsingGET = <
  TQueryFnData = AsyncReturnType<typeof getLoggedUsingGET, UserDTO>,
  TError = unknown,
  TData = TQueryFnData
>(options?: {
  query?: UseQueryOptions<TQueryFnData, TError, TData>;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options || {};

  const queryKey = queryOptions?.queryKey ?? getGetLoggedUsingGETQueryKey();

  const query = useQuery<TQueryFnData, TError, TData>(
    queryKey,
    () => getLoggedUsingGET<TQueryFnData>(requestOptions),
    {
      retry: false,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retryOnMount: false,
      refetchIntervalInBackground: false,
      staleTime: Infinity,
      ...queryOptions,
    }
  );

  return {
    queryKey,
    ...query,
  };
};

export const registerUsingPOST = <TData = UserDTO>(
  userCreationDTO: UserCreationDTO,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<TData>(
    { url: `/auth/register`, method: "post", data: userCreationDTO },
    // eslint-disable-next-line
    // @ts-ignore
    options
  );
};

export const useRegisterUsingPOST = <
  TData = AsyncReturnType<typeof registerUsingPOST, UserDTO>,
  TError = unknown,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    TData,
    TError,
    { data: UserCreationDTO },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options || {};

  return useMutation<TData, TError, { data: UserCreationDTO }, TContext>(
    (props) => {
      const { data } = props || {};

      return registerUsingPOST<TData>(data, requestOptions);
    },
    mutationOptions
  );
};
export const getRolesUsingGET = <TData = RoleDTO[]>(
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<TData>(
    { url: `/auth/roles`, method: "get" },
    // eslint-disable-next-line
    // @ts-ignore
    options
  );
};

export const getGetRolesUsingGETQueryKey = () => [`/auth/roles`];

export const useGetRolesUsingGET = <
  TQueryFnData = AsyncReturnType<typeof getRolesUsingGET, RoleDTO[]>,
  TError = unknown,
  TData = TQueryFnData
>(options?: {
  query?: UseQueryOptions<TQueryFnData, TError, TData>;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options || {};

  const queryKey = queryOptions?.queryKey ?? getGetRolesUsingGETQueryKey();

  const query = useQuery<TQueryFnData, TError, TData>(
    queryKey,
    () => getRolesUsingGET<TQueryFnData>(requestOptions),
    queryOptions
  );

  return {
    queryKey,
    ...query,
  };
};
