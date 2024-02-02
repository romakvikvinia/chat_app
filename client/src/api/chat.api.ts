import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ConversationMessagesQueryArgs,
  ConversationMessagesResponseType,
  ConversationsResponseType,
  CreateConversationArgsType,
  CreateConversationResponseType,
  CreateMessageArgs,
  CreateMessageResponseType,
  DeleteMessageArgsType,
  DeleteMessageResponseType,
  GetMeResponseType,
  MessageType,
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
  tagTypes: [
    "SignUp",
    "SignIn",
    "GetMe",
    "Conversations",
    "Conversation_messages",
  ],
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

    /**
     * Conversations
     */
    conversations: builder.query<ConversationsResponseType, void>({
      query: () => ({
        url: `/conversations`,
      }),
      transformResponse: (response: ConversationsResponseType) => {
        // let map = Map<number, ConversationType>();
        // response.forEach((conversation) => {
        //   map = map.set(conversation.id, conversation);
        // });
        return response;
      },
      providesTags: ["Conversations"],
    }),

    /**
     * conversation messages by conversation id
     */
    conversationMessages: builder.query<
      ConversationMessagesResponseType,
      ConversationMessagesQueryArgs
    >({
      query: ({ id }) => ({
        url: `conversations/${id}/messages`,
      }),

      providesTags: ["Conversation_messages"],
    }),

    /**
     * create Message
     */
    createMessage: builder.mutation<
      CreateMessageResponseType,
      CreateMessageArgs
    >({
      query: ({ conversationId, content }) => ({
        url: `/conversations/${conversationId}/messages`,
        body: { content },
        method: "POST",
      }),
    }),

    /**
     * create Message
     */

    createConversation: builder.mutation<
      CreateConversationResponseType,
      CreateConversationArgsType
    >({
      query: ({ email, message }) => ({
        url: `/conversations`,
        method: "POST",
        body: {
          email,
          message,
        },
      }),
    }),
    /**
     * Delete Message
     */

    deleteMessage: builder.mutation<
      DeleteMessageResponseType,
      DeleteMessageArgsType
    >({
      query: ({ conversationId, messageId }) => ({
        url: `/conversations/${conversationId}/messages/${messageId}`,
        method: "DELETE",
      }),
      async onQueryStarted(
        { conversationId, messageId },
        { dispatch, queryFulfilled }
      ) {
        try {
          await queryFulfilled;
          dispatch(
            chatAppApi.util.updateQueryData(
              "conversationMessages",
              { id: conversationId },
              (draftMessages: MessageType[]) => {
                draftMessages = draftMessages.filter(
                  (msg) => msg.id !== messageId
                );
                return draftMessages;
              }
            )
          );
        } catch (error) {
          console.log("error", error);
        }
      },
    }),

    /**
     *
     */
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetMeQuery,
  useConversationsQuery,
  useLazyConversationMessagesQuery,
  useCreateMessageMutation,
  useCreateConversationMutation,
  useDeleteMessageMutation,
} = chatAppApi;
