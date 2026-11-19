import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";

export async function createConversation(req, res) {
  try {
    // GET USER ID
    const userID = req.headers["x-user-id"];

    // CREATE CONVERSATION
    const conversation = await conversationModel.create({
      user: userID,
    });

    return res
      .status(201)
      .json({ message: "Conversation Save Successfully", conversation });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Create Conversation Error", error });
  }
}

export async function getConversation(req, res) {
  try {
    // GET USER ID
    const userID = req.headers["x-user-id"];

    // GET ALL CONVERSATION OF USER
    const allConversation = await conversationModel.find({
      user: userID,
    }).sort({ updatedAt: -1 });

    res
      .status(200)
      .json({ message: "Conversation Fetched  Successfully", allConversation });
  } catch (error) {
    return res.status(500).json({ message: "Get Conversation Error", error });
  }
}

export async function saveMessage(req, res) {
  try {
    const { conversationID, role, content } = req.body;

    const message = await messageModel.create({
      conversationID,
      role,
      content,
    });

    return res
      .status(201)
      .json({ message: "Message Save Successfully", message });
  } catch (error) {
    return res.status(500).json({ message: "Message Save Error", error });
  }
}
