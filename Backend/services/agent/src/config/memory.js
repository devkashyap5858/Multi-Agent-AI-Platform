import redis from "../../../../shared/redis/redis.js";
import { getMessages } from "./api.js";

export async function getMemory(conversationId) {
  try {
    // REDIS KEY
    const key = `messages-${conversationId}`;

    // CHECK REDIS CACHE
    const cachedMessages = await redis.get(key);

    // RETURN CACHED MESSAGES
    if (cachedMessages) {
      return JSON.parse(cachedMessages);
    }

    // FETCH MESSAGES FROM DATABASE
    const data = await getMessages(conversationId);

    const messages = data.allMessages;

    // STORE MESSAGES IN REDIS FOR 24 HOURS
    await redis.set(key, JSON.stringify(messages), "EX", 24 * 60 * 60);

    // RETURN MESSAGES
    return messages;
  } catch (error) {
    console.error("Error Fetching Conversation Memory:", error);
    return [];
  }
}

export async function addMessageInRedis(conversationId, role, content) {
  try {
    // REDIS KEY
    const key = `messages-${conversationId}`;

    // GET EXISTING MESSAGES
    const rawMessages = await redis.get(key);

    // PARSE MESSAGES
    const messages = rawMessages ? JSON.parse(rawMessages) : [];

    // ADD NEW MESSAGE
    messages.push({
      role,
      content,
      conversationId,
    });

    // MAINTAIN LAST 20 MESSAGES
    if (messages.length > 20) {
      messages.splice(0, messages.length - 20);
    }

    // UPDATE REDIS CACHE WITH 24 HOUR TTL
    await redis.set(key, JSON.stringify(messages), "EX", 24 * 60 * 60);

    return messages;
  } catch (error) {
    console.error("Error Adding Message To Redis:", error);
  }
}
