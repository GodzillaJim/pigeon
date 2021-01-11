const _ = require('lodash');
const books = [
  'Genesis',
  'Exodus',
  'leviticus',
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
    [book.replace(/\s/g, '')]: require(`../bible/${book.replace(
      /\s/g,
      ''
    )}.json`),
  });
});
const getAllChapters = (booker) => {
  let chapters = 'Book not found';
  bible.map((book) => {
    if (book[booker]) {
      chapters = book[booker].chapters;
    }
  });
  if (chapters === 'Book not found') {
    throw new Error('Book not found');
  }
  return chapters;
};
module.exports = { bible, books, getAllChapters };
