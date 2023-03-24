const db = require("../config/db");

const list = (params) => {
  return new Promise((resolve, reject) => {
    let condition = "";
    let val = [];

    if (params.title) {
      condition += "book.title = ? ";
      val.push(params.title);
    }

    if (params.author) {
      if (val.length > 0) {
        condition += "AND ";
      }
      condition += "author_pseudonym = ? ";
      val.push(params.author);
    }

    if (params.description) {
      if (val.length > 0) {
        condition += "AND ";
      }
      condition += "book.description = ? ";
      val.push(params.description);
    }

    if (params.price) {
      if (val.length > 0) {
        condition += "AND ";
      }
      condition += "book.price = ?";
      val.push(params.price);
    }

    if (val.length > 0) {
      condition = `WHERE ${condition}`;
      // show only published books
      // default upon creation
      condition += "AND book.isPublished=1";
    }
    let sql = `select * from book left join user on user.user_id = book.author_id ${condition}`;

    db.query(sql, val, function (error, result) {
      if (error) {
        reject(error);
      } else {
        // hide password in display
        for (const key in result) {
          delete result[key].password;
        }
        resolve(result);
      }
    });
  });
};

const add = (params) => {
  return new Promise((resolve, reject) => {
    let fields = Object.keys(params).join(",");
    let values = [];
    values.push(Object.values(params));

    let sql = `insert into book(${fields}) values ? `;

    db.query(sql, [values], function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const update = (params, book_id) => {
  return new Promise((resolve, reject) => {
    let fields_values = [];
    let values = [];

    Object.keys(params).forEach(function (key, index) {
      let value = params[key];
      values = `${key}='${value}'`;
      fields_values.push(values);
    });
    fields_values.join(",");
    let sql = `update book SET ${fields_values} WHERE book_id = ?`;
    console.log(book_id);
    db.query(sql, book_id, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const read = (params, book_id) => {
  return new Promise((resolve, reject) => {
    let sql = `select * from book where book_id = ?`;

    db.query(sql, book_id, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const unpublished = (params, book_id) => {
  return new Promise(async (resolve, reject) => {
    let fields_values = [];
    let values = [];
    let bookAuthorUsername = await findAuthorUsername(book_id);
    console.log("dada", bookAuthorUsername);
    // check if darth vader unpublishing
    if (bookAuthorUsername === "_Darth Vader_") {
      reject("user cant do this");
    }
    Object.keys(params).forEach(function (key, index) {
      let value = params[key];
      values = `${key}='${value}'`;
      fields_values.push(values);
    });
    fields_values.join(",");
    let sql = `update book SET ${fields_values} WHERE book_id = ?`;

    db.query(sql, book_id, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const findAuthorUsername = (book_id) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT username FROM book left join user on user.user_id = book.author_id where book.book_id = ? limit 1`;
    db.query(sql, book_id, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result[0].username);
      }
    });
  });
};

module.exports = { list, add, update, read, unpublished };
