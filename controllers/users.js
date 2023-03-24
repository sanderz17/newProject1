const userModel = require("../models/user");
const helpers = require("../helpers");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "fields required." });

    const user = await userModel.getUserByUsername(username);
    console.log("user", user);
    if (!user.length) return res.status(401).json({ message: "unauthorized" });

    const is_match = await helpers.comparePassword(password, user[0].password);

    if (!is_match)
      return res.status(401).json({ message: "password is incorrect." });

    const token = await helpers.generateToken(user);

    let user_details = {
      "Last Name": user[0].last_name,
      "First Name": user[0].first_name,
    };

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "success", token, user_details });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, password , first_name, last_name, author_pseudonym}  = req.body;

    if (!username || !password || !first_name || !last_name || !author_pseudonym) 
      return res.status(400).json({ message: "fields required." });

    const user = await userModel.getUserByUsername(username);

    if (user.length) return res.status(409).json({ message: "exist" });

    const hash_password = await helpers.hashPassword(password);

    const params = {
      username,
      password: hash_password,
      first_name,
      last_name,
      author_pseudonym
    };

    await userModel.insert(params);

    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, register };
