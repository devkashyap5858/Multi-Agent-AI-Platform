import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import proxy from "express-http-proxy";
import authMiddleware from "./src/middleware/auth.middleware.js";
import { getMe } from "./src/controllers/user.controller.js";
import { proxyWithHeder } from "./src/utils/proxyWithHeder.js";
dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// AUTH SERVICE
app.use("/api/auth", proxy(process.env.AUTH_SERVICE));

// CHAT SERVICE
app.use("/api/chat", authMiddleware, proxyWithHeder(process.env.CHAT_SERVICE));

// FOR GET USER INFO
app.use("/api/getme", authMiddleware, getMe);

// DEMO ROUTE
app.get("/", (req, res) => {
  res.status(200).json({ message: "Gateway Started" });
});

app.listen(port, () => {
  console.log(`Gateway Started at http://localhost:${port}`);
});
