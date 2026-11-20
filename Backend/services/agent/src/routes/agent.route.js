import express from "express";
import { agent } from "../controllers/agent.controller.js";

const agentRouter = express.Router();

// AGENT ROUTER
agentRouter.post("/chat", agent);

export default agentRouter;
