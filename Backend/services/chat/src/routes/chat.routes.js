import express from "express";
import {
  createConversation,
  getConversation,
  getMessages,
  saveMessage,
} from "../controllers/chat.controller.js";

const chatRouter = express.Router();

chatRouter.post("/create-conversation", createConversation);

chatRouter.get("/get-conversation", getConversation);

chatRouter.post("/save-message", saveMessage);

chatRouter.get("/get-messages/:conversationId", getMessages);

export default chatRouter;
