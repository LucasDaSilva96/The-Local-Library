const express = require("express");
const {
  createNewBook,
  getAllBooks,
  getSpecificBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const {
  createNewAuthor,
  getAllAuthors,
  getSpecificAuthor,
  deleteAuthor,
  updateAuthor,
} = require("../controllers/authorController");

const {
  createNewGenre,
  getAllGenres,
  deleteGenre,
  updateGenre,
} = require("../controllers/genreController");

const {
  createNewBookInstance,
  getAllBookInstances,
  getSpecificBookInstance,
  deleteBookInstance,
  updateBookInstance,
} = require("../controllers/bookinstanceController");

const router = express.Router();
//
router.get("/books", getAllBooks);
router.get("/authors", getAllAuthors);
router.get("/genres", getAllGenres);
router.get("/bookInstances", getAllBookInstances);
//
router.get("/books/:id", getSpecificBook);
router.get("/authors/:id", getSpecificAuthor);
router.get("/bookInstances/:id", getSpecificBookInstance);
//
router.post("/books/create", createNewBook);
router.post("/authors/create", createNewAuthor);
router.post("/genres/create", createNewGenre);
router.post("/bookInstances/create", createNewBookInstance);
//
router.delete("/books/:id/delete", deleteBook);
router.delete("/authors/:id/delete", deleteAuthor);
router.delete("/bookInstances/:id/delete", deleteBookInstance);
router.delete("/genres/:id/delete", deleteGenre);
//
router.patch("/books/:id/update", updateBook);
router.patch("/authors/:id/update", updateAuthor);
router.patch("/bookInstances/:id/update", updateBookInstance);
router.patch("/genres/:id/update", updateGenre);

module.exports = router;
