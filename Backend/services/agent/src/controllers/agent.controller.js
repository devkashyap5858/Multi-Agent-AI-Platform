import { saveMessage } from "../config/api.js";
import { graph } from "../graph/graph.js";

export async function agent(req, res) {
  try {
    // GET DATA
    const { prompt, conversationID } = req.body;

    // SAVE USER MESSAGE
    await saveMessage(conversationID, "user", prompt);

    // GRAPH INVOKE
    const result = await graph.invoke({ prompt, conversationID });

    // SAVE AI RESPONSE
    await saveMessage(conversationID, "agent", result.aiResponse);

    return res
      .status(200)
      .json({ message: "Agent Response", aiResponse: result.aiResponse });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Agent Error", error });
  }
}
