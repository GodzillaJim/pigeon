const express = require('express');

const router = express.Router();
const {
  books,
  getCategories,
  getAllChapters,
  getAllVerses,
  getVerse,
} = require('../controllers/controller');

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
router.get('/books/:book/:chapter', (req, res) => {
  try {
    let book = req.params.book;
    let chapter = req.params.chapter;
    let verses = getAllVerses(book, chapter);
    res.json(verses);
  } catch (error) {
    res.status(400);
    res.json(error.message);
  }
});
router.get('/books/:book/:chapter/:verse', (req, res) => {
  try {
    const { book, chapter, verse } = req.params;
    const r = getVerse(book, chapter, verse);
    res.json(r);
  } catch (error) {
    res.status(400);
    res.json(error.message);
  }
});
router.get('/categories', (req, res) => {
  try {
    const cats = getCategories();
    console.log(cats);
    res.json(cats);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});
module.exports = router;
