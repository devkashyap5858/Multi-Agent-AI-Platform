import { Annotation } from "@langchain/langgraph";

// CREATE CUSTOM STATE
export const agentState = Annotation.Root({
  // FOR USER PROMPT
  prompt: Annotation(),
  // FOR AI RESPONCE
  aiResponce: Annotation(),
  // FOR AGENT
  agent: Annotation(),
  // FOR CONVERSATION ID
  conversationID: Annotation(),
});
