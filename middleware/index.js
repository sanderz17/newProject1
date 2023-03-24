const helpers = require("../helpers");
const userModel = require("../models/user");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization || req.cookies.token;

    if (!token) return res.status(403).json({ message: "unauthorized" });

    const decoded = await helpers.verifyToken(token);

    const user = await userModel.getUserByUsername(decoded.username);
    console.log(user);
    if (!user.length) return res.status(403).json({ message: "unauthorized" });

    req.user = decoded;

    next();
  } catch (error) {
    console.log("catch", error);
    res.clearCookie("token");
    res.status(403).json({ message: "unauthorized" });
  }
};

module.exports = { verifyToken };
