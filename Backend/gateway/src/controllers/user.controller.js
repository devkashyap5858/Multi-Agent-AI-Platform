export async function getMe(req, res) {
  try {
    // GET USER INFO FROM AUTH MIDDLE WARE
    const userInfo = req.user;

    return res.status(200).json({ message: "UserInfo  ", user: userInfo });
  } catch (error) {
    return res.status(500).json({ message: `GetMe Error ${error}` });
  }
}
