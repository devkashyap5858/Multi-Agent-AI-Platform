import express from "express";
import dotenv from "dotenv";
import connectToDB from "./src/config/db.js";
import authRouter from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use("/", authRouter);

// DEMO ROUTE
app.get("/", (req, res) => {
  res.status(200).json({ message: "Auth Service Started" });
});

app.listen(port, () => {
  console.log(`Auth Service Started at http://localhost:${port}`);
  connectToDB();
});
