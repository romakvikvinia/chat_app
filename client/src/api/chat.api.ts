import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetMeResponseType,
  SignInInput,
  SignInResponseType,
  SignUpInput,
  SignUpResponseType,
} from "./types";

// Define a service using a base URL and expected endpoints

export const chatAppApi = createApi({
  reducerPath: "chat_app",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    credentials: "include",
  }),
  tagTypes: ["SignUp", "SignIn", "GetMe"],
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponseType, SignUpInput>({
      query: ({ email, firstName, lastName, password }) => ({
        url: `/auth/signup`,
        body: {
          email,
          firstName,
          lastName,
          password,
        },
        method: "POST",
      }),
      invalidatesTags: ["SignUp"],
    }),

    /**
     * Sign in
     */
    signIn: builder.mutation<SignInResponseType, SignInInput>({
      query: ({ email, password }) => ({
        url: `/auth/signin`,
        body: {
          email,
          password,
        },
        method: "POST",
      }),
      invalidatesTags: ["SignIn"],
    }),

    /**
     * Auth user status
     */

    getMe: builder.query<GetMeResponseType, void>({
      query: () => ({ url: "/auth/status" }),
      transformResponse: (data: GetMeResponseType) => {
        return data;
      },
      providesTags: ["GetMe"],
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useGetMeQuery } =
  chatAppApi;
