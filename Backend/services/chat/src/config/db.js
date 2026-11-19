import mongoose from "mongoose";

// CREATE DATABASE CONNECTION
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log(`DB Error ${error}`);
  }
}

export default connectToDB