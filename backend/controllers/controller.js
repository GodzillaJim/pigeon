const categories = require('../utilities/tools.js');
const _ = require('lodash');
const path = require('path');
const verses = require('../utilities/indexing');
const books = [
  'Genesis',
  'Exodus',
  'Leviticus',
  'Numbers',
  'Deuteronomy',
  'Judges',
  'Joshua',
  '1 Samuel',
  '2 Samuel',
  'Ruth',
  '1 Kings',
  '2 Kings',
  '1 Chronicles',
  '2 Chronicles',
  'Nehemiah',
  'Ezra',
  'Esther',
  'Job',
  'Psalms',
  'Proverbs',
  'Ecclesiastes',
  'Song of Solomon',
  'Isaiah',
  'Jeremiah',
  'Lamentations',
  'Ezekiel',
  'Daniel',
  'Hosea',
  'Joel',
  'Amos',
  'Obadiah',
  'Jonah',
  'Micah',
  'Nahum',
  'Habakkuk',
  'Zephaniah',
  'Haggai',
  'Zechariah',
  'Malachi',
  'Matthew',
  'Mark',
  'Luke',
  'John',
  'Acts',
  'Romans',
  '1 Corinthians',
  '2 Corinthians',
  'Ephesians',
  'Colossians',
  'Galatians',
  'Philippians',
  '1 Thessalonians',
  '2 Thessalonians',
  '1 Timothy',
  '2 Timothy',
  'Titus',
  'Philemon',
  'James',
  'Hebrews',
  '1 Peter',
  '2 Peter',
  '1 John',
  '2 John',
  '3 John',
  'Jude',
  'Revelation',
];
const bible = [];
books.map((book) => {
  bible.push({
    [book.replace(/\s/g, '')]: require(path.join(
      '../bible',
      `${book.replace(/\s/g, '')}.json`
    )),
  });
});

// Putting space between number and book
const parseBook = (book) => {
  try {
    let strArr = book.split('');
    if (
      strArr[0] === '1' ||
      strArr[0] === '2' ||
      strArr[0] === '3' ||
      strArr[0] === '4'
    ) {
      let str = strArr[0] + ' ' + strArr.slice(1).join('');
      console.log(str);
      return str;
    }
  } catch (error) {
    console.log(error);
    return book;
  }
};

// Search controller
const searchVerse = (keyword) => {
  // Method 1: Brute force
  try {
    const result = [];
    for (let i = 0; i < verses.length; i++) {
      if (verses[i].text.toLowerCase().includes(keyword.toLowerCase())) {
        result.push(verses[i]);
      }
    }
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllChapters = (booker) => {
  let chapters = 'Book not found';
  bible.map((book) => {
    if (book[booker]) {
      chapters = book[booker].chapters;
    }
  });
  if (chapters === 'Book not found') {
    const query = booker.split('').slice(0, 3).join('');
    console.log(query);
    const searchBooks = [];
    books.map((book) => {
      if (
        book.includes(query) ||
        book.startsWith(query) ||
        book.endsWith(query)
      ) {
        searchBooks.push(book);
      }
    });
    return { status: 'fail', books: searchBooks };
  }
  let a = [];
  chapters.map((key, index) => {
    a[index] = Number(index + 1);
  });
  return a;
};
const getAllVerses = (booker, chapter) => {
  if (!booker || !chapter) {
    throw new Error('Wrong information');
  }
  let chapters = 'Chapter not found';
  bible.map((book) => {
    if (book[booker]) {
      chapters = book[booker].chapters;
    }
  });
  // Book not found
  if (chapters === 'Chapter not found') {
    const query = booker.split('').slice(0, 3).join('');
    console.log(query);
    const searchBooks = [];
    books.map((book) => {
      if (
        book.includes(query) ||
        book.startsWith(query) ||
        book.endsWith(query)
      ) {
        searchBooks.push(book);
      }
    });
    return { status: 'fail', books: searchBooks };
  }

  // Chapter is above last chapter
  if (chapters.length < chapter) {
    chapter = chapters.length;
  }
  //Chapter is below 1
  if (chapter < 1) {
    chapter = 1;
  }
  const verses = chapters[chapter - 1];
  let a = [];

  // Additional checking
  if (!verses || !verses.verses) {
    throw new Error('Chapter not found!');
  }
  verses.verses.map((key, index) => {
    a[index] = Number(index + 1);
  });
  return a;
};
const getVerse = (booker, chapter, verse) => {
  if (!booker || !chapter) {
    throw new Error('Wrong information');
  }
  let chapters = 'Book not found';
  bible.map((book) => {
    if (book[booker]) {
      chapters = book[booker].chapters;
    }
  });

  // Book not found
  if (chapters === 'Book not found') {
    const query = booker.split('').slice(0, 3).join('');
    console.log(query);
    const searchBooks = [];
    books.map((book) => {
      if (
        book.includes(query) ||
        book.startsWith(query) ||
        book.endsWith(query)
      ) {
        searchBooks.push(book);
      }
    });
    return { status: 'fail', books: searchBooks };
  }
  // check chapter is available
  if (chapter < 1) {
    chapter = 1;
  }
  if (chapter > chapters.length) {
    chapter = chapters.length;
  }
  const verses = chapters[chapter - 1];
  let t = verses.verses;

  if (verse < 1) {
    verse = 1;
  }
  if (verse > t.length) {
    verse = t.length;
  }
  let i = Number(verse) + 15 < t.length ? 15 : t.length - Number(verse);
  let page = t.slice(Number(verse - 1), Number(verse) + i);

  const r = {
    text: verses.verses[verse - 1].text,
    currentVerse: verse,
    finalVerse: verses.verses.length,
    page,
  };
  return r;
};
const getCategories = () => categories;
module.exports = {
  bible,
  getCategories,
  books,
  getAllChapters,
  getAllVerses,
  getVerse,
  searchVerse,
};
