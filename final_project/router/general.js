const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
const public_users = express.Router();

// TASK 10: GET ALL BOOKS (async)
public_users.get('/', async function (req, res) {
  try {
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// TASK 11: GET BY ISBN (async)
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try {
    await new Promise(resolve => setTimeout(resolve, 100));
    const book = books[isbn];
    if (book) return res.status(200).json(book);
    return res.status(404).json({ message: "Book not found" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// TASK 12: GET BY AUTHOR (async)
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author.toLowerCase();
  const results = [];
  try {
    await new Promise(resolve => setTimeout(resolve, 100));
    for (const key in books) {
      if (books[key].author.toLowerCase().includes(author)) {
        results.push(books[key]);
      }
    }
    if (results.length > 0) return res.status(200).json(results);
    return res.status(404).json({ message: "No books found" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// TASK 13: GET BY TITLE (async)
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title.toLowerCase();
  const results = [];
  try {
    await new Promise(resolve => setTimeout(resolve, 100)); 
    for (const key in books) {
      if (books[key].title.toLowerCase().includes(title)) {
        results.push(books[key]);
      }
    }
    if (results.length > 0) return res.status(200).json(results);
    return res.status(404).json({ message: "No books found" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// TASK 5: GET REVIEWS (unchanged)
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book && book.reviews) return res.status(200).json(book.reviews);
  return res.status(200).json({});
});

module.exports.general = public_users;