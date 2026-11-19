import { app } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";
import userModel from "../models/user.model.js";
import redis from "../../../../shared/redis/redis.js";

export async function login(req, res) {
  try {
    // GET TOKEN FROM BODY
    const { token } = req.body;

    // DECODE THE TOKEN
    const decoded = await getAuth(app).verifyIdToken(token);

    // CHECK USER IS EXIST
    let user = await userModel.findOne({
      firebaseUid: decoded.uid,
    });

    // IF USER NOT EXIST CREATE NEW USER
    if (!user) {
      await userModel.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
      });
    }

    // CREATE SESSION ID
    const sessionID = crypto.randomUUID();

    // SET THE SESSION AND USER INFO IN REDIS
    await redis.set(
      `session-${sessionID}`,
      JSON.stringify({
        userID: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      }),
      "EX",
      7 * 24 * 60 * 60,
    );

    // SET THE SESSION INTO COOKIE
    res.cookie("session", sessionID, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login Successfully", user });
  } catch (error) {
    return res.status(500).json({ message: `Login Error ${error}` });
  }
}

export async function logOut(req, res) {
  try {
    // GET SESSION ID FROM COOKIE
    const sessionID = req.cookie.session;

    // DELETE SESSION ID FROM REDIS
    await redis.del(`session-${sessionID}`);

    // DELETE SESSION ID FROM COOKIE
    res.clearCookie("session");

    return res.status(200).json({ message: "LogOut Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `LogOut Error ${error}` });
  }
}

