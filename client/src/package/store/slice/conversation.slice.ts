import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ConversationType } from "../../../api/types";

export interface ConversationState {
  conversations: ConversationType[];
}

const initialState: ConversationState = {
  conversations: [],
};

export const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      console.log("addConversation");
      state.conversations.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addConversation } = conversationSlice.actions;

export default conversationSlice;
