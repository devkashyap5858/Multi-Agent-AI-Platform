import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth.slice.js";
import conversationReducer from "../redux/conversation.slice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    conversation: conversationReducer,
  },
});
