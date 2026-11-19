import express from "express";
import dotenv from "dotenv";
import connectToDB from "./src/config/db.js";
import agentRouter from "./src/routes/agent.route.js";
dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/", agentRouter);

// DEMO ROUTE
app.get("/", (req, res) => {
  res.status(200).json({ message: "Agent Service Started" });
});

app.listen(port, () => {
  console.log(`Agent Service Started at http://localhost:${port}`);
  connectToDB();
});
