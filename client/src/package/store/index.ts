import Immutable from "immutable";
import { configureStore } from "@reduxjs/toolkit";
// reducers
import ConversationReducer from "./slice/conversation.slice";
import { chatAppApi } from "../../api/chat.api";

export const store = configureStore({
  reducer: {
    [ConversationReducer.name]: ConversationReducer.reducer,
    // [chatAppApi.reducerPath]: (state, action) => action.type !== HYDRATE ? chatAppApi.reducer(state, action) : {...state, ...(action.payload as unknown)[chatAppApi.reducerPath]},
    [chatAppApi.reducerPath]: chatAppApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatAppApi.middleware),
  devTools: {
    serialize: {
      immutable: Immutable,
      options: true,
    },
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
