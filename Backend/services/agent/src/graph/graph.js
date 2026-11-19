import { StateGraph } from "@langchain/langgraph";
import { agentState } from "../graph/state.js";
import { router } from "./route.js";
import { chatAgent } from "../agents/chat.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { searchAgent } from "../agents/search.agent.js";
import { imageGenAgent } from "../agents/imageGen.agent.js";

const workFlow = new StateGraph(agentState);

workFlow.addNode("router", router);
workFlow.addNode("chat", chatAgent);
workFlow.addNode("coding", chatAgent);
workFlow.addNode("pdf", pdfAgent);
workFlow.addNode("ppt", pptAgent);
workFlow.addNode("search", searchAgent);
workFlow.addNode("vision", imageGenAgent);

workFlow.addEdge("__start__", "router");

workFlow.addConditionalEdges(
  "router",
  (state) => {
    switch (state.agent) {
      case chat:
        return "chat";
      case coding:
        return "coding";
      case pdf:
        return "pdf";
      case search:
        return "search";
      case ppt:
        return "ppt";
      case vision:
        return "vision";
      default:
        return "chat";
    }
  },
  {
    chat: "chat",
    coding: "coding",
    ppt: "ppt",
    pdf: "pdf",
    search: "search",
    vision: "vision",
  },
);

workFlow.addEdge("search", "chat");
workFlow.addEdge("chat", "__end__");
workFlow.addEdge("coding", "__end__");
workFlow.addEdge("pdf", "__end__");
workFlow.addEdge("ppt", "__end__");
workFlow.addEdge("vision", "__end__");

export const graph = workFlow.compile();
