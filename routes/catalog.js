const express = require("express");
const {
  createNewBook,
  getAllBooks,
  getSpecificBook,
  updateBook,
  deleteBook,
  index,
  renderCreateNewBook,
} = require("../controllers/bookController");

const {
  createNewAuthor,
  getAllAuthors,
  getSpecificAuthor,
  deleteAuthor,
  updateAuthor,
  renderCreateNewAuthor,
  renderDeleteAuthor,
} = require("../controllers/authorController");

const {
  createNewGenre,
  getAllGenres,
  deleteGenre,
  updateGenre,
  renderCreateNewGenre,
} = require("../controllers/genreController");

const {
  createNewBookInstance,
  getAllBookInstances,
  getSpecificBookInstance,
  deleteBookInstance,
  updateBookInstance,
  renderCreateNewBookInstance,
} = require("../controllers/bookinstanceController");

const router = express.Router();
//
router.get("/", index);
router.get("/books", getAllBooks);
router.get("/authors", getAllAuthors);
router.get("/genres", getAllGenres);
router.get("/bookInstances", getAllBookInstances);
router.get("/genres/create", renderCreateNewGenre);
router.get("/authors/create", renderCreateNewAuthor);
router.get("/books/create", renderCreateNewBook);
router.get("/bookInstances/create", renderCreateNewBookInstance);
router.get("/authors/:id/delete", renderDeleteAuthor);

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
router.post("/books/:id/delete", deleteBook);
router.post("/authors/:id/delete", deleteAuthor);
router.post("/bookInstances/:id/delete", deleteBookInstance);
router.post("/genres/:id/delete", deleteGenre);
//
router.patch("/books/:id/update", updateBook);
router.patch("/authors/:id/update", updateAuthor);
router.patch("/bookInstances/:id/update", updateBookInstance);
router.patch("/genres/:id/update", updateGenre);

module.exports = router;
