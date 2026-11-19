import express from "express";
import { login, logOut } from "../controller/auth.controllers.js";

const authRouter = express.Router();

// LOGIN ROUTE
authRouter.post("/login", login);

// LOGOUT ROUTE
authRouter.post("/logout", logOut);

export default authRouter;
