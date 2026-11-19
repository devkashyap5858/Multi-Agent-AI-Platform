import express from "express";
import dotenv from "dotenv";
import connectToDB from "./src/config/db.js";
import chatRouter from "./src/routes/chat.routes.js";
dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/", chatRouter);

// DEMO ROUTE
app.get("/", (req, res) => {
  res.status(200).json({ message: "Chat Service Started" });
});

app.listen(port, () => {
  console.log(`Chat Service Started at http://localhost:${port}`);
  connectToDB();
});
