const bookModel = require("../models/books");

const books = async (req, res, next) => {
  try {
    let params = {};
    for (const [prop, value] of Object.entries(req.query)) {
      params[prop] = value;
    }
    let data = {};
    console.log(params);
    data = await bookModel.list(params);
    res.status(200).json({
      message: "success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const addBook = async (req, res, next) => {
  try {
    let params = {};
    for (const [prop, value] of Object.entries(req.body)) {
      params[prop] = value;
    }
    await bookModel.add(params);
    res.status(200).json({
      message: "book added",
    });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    let params = {};
    let book_id = req.params.book_id;
    for (const [prop, value] of Object.entries(req.body)) {
      params[prop] = value;
    }
    console.log(req.params);
    await bookModel.update(params, book_id);
    res.status(200).json({
      message: "book updated",
    });
  } catch (error) {
    next(error);
  }
};
const readBook = async (req, res, next) => {
  try {
    let params = {};
    let book_id = req.params.book_id;
    data = await bookModel.read(params, book_id);
    res.status(200).json({
      message: "success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const unPublishedBook = async (req, res, next) => {
  try {
    let params = {};
    let book_id = req.params.book_id;
    params["isPublished"] = 0;
    await bookModel.unpublished(params, book_id);
    res.status(200).json({
      message: "book unpublished!"
    });
  } catch (error) {
    next(error);
  }
};

const getBookAuthorUsername = async (book_id) => {
  try {
    data = await bookModel.findAuthor(book_id);
    return data;
  } catch (error) {
    next(error)
  }
}

module.exports = {
  books,
  addBook,
  updateBook,
  readBook,
  unPublishedBook
};
