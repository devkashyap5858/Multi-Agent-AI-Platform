import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth.slice.js";
import conversationReducer from "../redux/conversation.slice.js";
import messagesReducer from "../redux/messages.slice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    conversation: conversationReducer,
    messages: messagesReducer,
  },
});
