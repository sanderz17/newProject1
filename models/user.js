const db = require("../config/db");

const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    let sql = `select * from user where user.username = ?`;
    db.query(sql, [username], function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const insert = (params) => {
  return db.query("INSERT INTO user (username, password, first_name, last_name, author_pseudonym) VALUES (?, ?, ?, ?, ?)", [
    params.username,
    params.password,
    params.first_name,
    params.last_name,
    params.author_pseudonym
  ]);
};

module.exports = { getUserByUsername, insert };
