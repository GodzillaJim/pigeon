const express = require('express');

const router = express.Router();
const {
  books,
  getCategories,
  getAllChapters,
  getAllVerses,
  getVerse,
  searchVerse,
} = require('../controllers/controller');

// POST router /search to search the bible
router.post('/search', (req, res) => {
  console.log(req.body);
  const { keyword, page } = req.body;

  try {
    const result = searchVerse(keyword);
    console.log(result);
    const diff = 10;
    const numOfPages = result.length / diff;
    const start = page === 1 ? 0 : Number(Number(page) - 1) * diff;
    let r = result.slice(start, Number(start) + diff);
    res.json({ numOfPages, r });
  } catch (error) {
    res.status(500);
    res.json(error);
  }
});

router.get('/books', (req, res) => {
  res.json(books);
});
router.get('/books/:book', (req, res) => {
  try {
    let book = req.params.book;
    let chapters = getAllChapters(book.replace(/\s/g, ''));
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
    let verses = getAllVerses(book.replace(/\s/g, ''), chapter);
    res.json(verses);
  } catch (error) {
    res.status(400);
    res.json(error.message);
  }
});
router.get('/books/:book/:chapter/:verse', (req, res) => {
  try {
    console.log(req.params);
    const { book, chapter, verse } = req.params;
    const r = getVerse(book.replace(/\s/g, ''), chapter, verse);
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
