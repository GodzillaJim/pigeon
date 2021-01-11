const express = require('express');
const router = express.Router();
const { books, getAllChapters } = require('../controllers/controller');

router.get('/books', (req, res) => {
  res.json(books);
});
router.get('/books/:book', (req, res) => {
  try {
    let book = req.params.book;
    let chapters = getAllChapters(book);
    res.json(chapters);
  } catch (error) {
    res.status(400);
    res.json(error.message);
  }
});
module.exports = router;
