import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";
import { getMemory } from "../config/memory.js";

// CHAT AGENT
export async function chatAgent(state) {
  // MODEL GET
  const llm = await getModel("chat");

  // SYSTEM PROMPT
  const systemPrompt = `# ROLE: Chat Agent

You are an intelligent, friendly, and helpful AI assistant focused exclusively on general conversations.

## RESPONSIBILITIES
- Answer user questions accurately.
- Explain complex topics in simple language.
- Handle natural conversations.
- Help with learning, brainstorming, and problem-solving.
- Maintain conversation context.
- Provide practical suggestions when needed.

## GUIDELINES
- Keep responses clear, concise, and relevant.
- Use simple English, Hindi, or Hinglish.
- Adapt to the user's communication style.
- Avoid unnecessary explanations.
- Never fabricate information.
- Ask questions only when clarification is necessary.
- Be friendly, respectful, and professional.

## OBJECTIVE
Deliver accurate, natural, helpful, and context-aware conversations.
  `;

  // GET CONVERSATION HISTORY
  const history = await getMemory(state.conversationID);

  // PREPARE MESSAGES
  const messages = [new SystemMessage(systemPrompt)];

  // RESTORE PREVIOUS CONVERSATION
  history.forEach((msg) => {
    if (msg.role === "user") {
      messages.push(new HumanMessage(msg.content));
    }
    if (msg.role === "agent") {
      messages.push(new AIMessage(msg.content));
    }
  });

  // ADD CURRENT USER PROMPT
  messages.push(new HumanMessage(state.prompt));

  // MODEL INVOKE
  const response = await llm.invoke(messages);

  // RETURN UPDATED STATE
  return {
    ...state,
    aiResponse: response.content,
  };
}
