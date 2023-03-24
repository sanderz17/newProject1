const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

  const hashPassword =  (password) => {
    const saltRounds = 10;

    return bcrypt.hash(password, saltRounds);
  }

  const comparePassword =  (password, hash_password) => {
    return bcrypt.compare(password, hash_password);
  }
  const generateToken = (user) => {
    console.log(user)
    const options = {
      algorithm: process.env.ALGORITHM,
      expiresIn: process.env.EXPIRY,
      issuer: process.env.ISSUER,
      subject: user[0].username,
    };

    const payload = {
      user_id: user[0].user_id,
      username: user[0].username
    };

    return jwt.sign(payload, process.env.SECRET, options);
  }

  const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET);
  }


module.exports = { hashPassword, comparePassword, generateToken, verifyToken};
