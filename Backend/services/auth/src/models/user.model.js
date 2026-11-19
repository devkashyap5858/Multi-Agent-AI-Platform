import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      unique: true,
    },
    name: String,
    email: String,
    avatar: String,
  },
  { timestamps: true },
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
