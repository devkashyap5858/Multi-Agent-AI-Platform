import redis from "../../../../shared/redis/redis.js";
import { saveMessage } from "../config/api.js";
import { addMessageInRedis } from "../config/memory.js";
import { graph } from "../graph/graph.js";

export async function agent(req, res) {
  try {
    // GET DATA
    const { prompt, conversationID } = req.body;

    // GRAPH INVOKE
    const result = await graph.invoke({ prompt, conversationID });

    // SAVE USER MESSAGE IN DATABASE
    await saveMessage(conversationID, "user", prompt);

    // SAVE AI RESPONSE IN DATABASE
    await saveMessage(conversationID, "agent", result.aiResponse);

    // SAVE USER MESSAGE IN REDIS
    await addMessageInRedis(conversationID, "user", prompt);

    // SAVE AI RESPONSE IN REDIS
    await addMessageInRedis(conversationID, "agent", result.aiResponse);

    return res
      .status(200)
      .json({ message: "Agent Response", aiResponse: result.aiResponse });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Agent Error", error });
  }
}
