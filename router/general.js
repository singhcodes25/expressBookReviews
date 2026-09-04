const express = require('express');
const axios = require('axios')
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/axios/books', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:5000/');
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching books"
      });
    }
  });

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn
  
  return res.status(300).json(books[isbn]);
 });
  
// Get book details based on author
public_users.get("/author/:author", function (req, res) {
    const author = req.params.author;
  
    const bookList = Object.values(books).filter(
      (book) => book.author === author
    );
  
    return res.status(200).json(bookList);
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
  
    const bookList = Object.values(books).filter(
      (book) => book.title === title
    );
  
    return res.status(200).json(bookList);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn
  
    return res.status(300).json(books[isbn].reviews);
});

module.exports.general = public_users;
