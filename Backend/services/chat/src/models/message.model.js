import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversations",
    },
    role: {
      type: String,
      enum: ["user", "agent"],
    },
    content: String,
  },
  { timeseries: true },
);

const messageModel = mongoose.model("messages", messageSchema);

export default messageModel;
