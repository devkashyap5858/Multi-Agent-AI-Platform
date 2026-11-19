import { saveMessage } from "../config/api.js";
import { graph } from "../graph/graph.js";

export async function agent(req, res) {
  try {
    const { prompt, conversationID } = req.body;

    await saveMessage(conversationID, "user", prompt);

    const result = await graph.invoke({ prompt, conversationID });

    const responce = result.aiResponce;

    return res.status(200).json({ message: "Agent Responce", responce });
  } catch (error) {
    return res.status(500).json({ message: "Agent Error", error });
  }
}
