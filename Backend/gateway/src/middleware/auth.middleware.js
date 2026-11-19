import redis from "../../../shared/redis/redis.js";

async function authMiddleware(req, res, next) {
  try {
    // GET SESSION ID FROM COOKIES
    const sessionID = req.cookies?.session;

    // CHECK SESSION ID EXIST
    if (!sessionID) {
      return res.status(400).json({ message: "Unauthorized" });
    }

    // GET USER DATA TO REDIS
    const data = await redis.get(`session-${sessionID}`);

    // CHECK USER DATA EXIST
    if (!data) {
      return res.status(400).json({ message: "Session expired" });
    }

    // PARSE THE DATA AND SAVE
    req.user = JSON.parse(data);

    next();
  } catch (error) {
    return res.status(500).json({ message: `Protected error ${error}` });
  }
}

export default authMiddleware;
