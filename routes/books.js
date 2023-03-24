const express = require('express');
const router  = express.Router();
const bookController = require('../controllers/books');
const middleware = require("../middleware");

router.get('/books/list', bookController.books);

router.post('/books', middleware.verifyToken, bookController.addBook);
router.put('/books/:book_id', middleware.verifyToken, bookController.updateBook)
router.get('/books/:book_id', middleware.verifyToken, bookController.readBook)
router.delete('/books/:book_id', middleware.verifyToken, bookController.unPublishedBook);

module.exports = router;    