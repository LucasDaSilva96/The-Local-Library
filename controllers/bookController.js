const BookModel = require("../models/bookSchema");
const BookInstanceModel = require("../models/bookInstanceSchema");
const AuthorModel = require("../models/authorSchema");
const { GenresModel } = require("../models/genresSchema");

exports.index = async (req, res, next) => {
  // Get details of books, book instances, authors and genre counts (in parallel)
  const [
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres,
  ] = await Promise.all([
    BookModel.find(),
    BookInstanceModel.find(),
    BookInstanceModel.find({ status: "Available" }),
    AuthorModel.find(),
    GenresModel.find(),
  ]);

  res.render("index", {
    title: "Local Library Home",
    book_count: numBooks.length,
    book_instance_count: numBookInstances.length,
    book_instance_available_count: numAvailableBookInstances.length,
    author_count: numAuthors.length,
    genre_count: numGenres.length,
  });
};

exports.renderUpdateBook = async (req, res, next) => {
  const [book, allAuthors, allGenres] = await Promise.all([
    BookModel.findById(req.params.id).populate("author"),
    AuthorModel.find().sort({ family_name: 1 }),
    GenresModel.find().sort({ name: 1 }),
  ]);

  if (book === null) {
    // No results.
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  // Mark our selected genres as checked.
  allGenres.forEach((genre) => {
    if (book.genre.includes(genre._id)) genre.checked = "true";
  });

  res.render("book_form", {
    title: "Update Book",
    authors: allAuthors,
    genres: allGenres,
    book: book,
  });
};

exports.renderCreateNewBook = async (req, res, next) => {
  const allAuthors = await AuthorModel.find();
  const allGenres = await GenresModel.find();
  res.render("book_form", {
    title: "Create Book",
    authors: allAuthors,
    genres: allGenres,
  });
};

// TODO Add more validation before creating a new book
exports.createNewBook = async (req, res, next) => {
  try {
    await BookModel.create({ ...req.body });
    // res.status(201).json({
    //   status: "success",
    //   message: "New book successfully created",
    // });

    res.redirect("/books");
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getAllBooks = async (req, res, next) => {
  const allBooks = await BookModel.find().sort({ title: 1 }).populate("author");

  res.render("book_list", { title: "Book List", book_list: allBooks });
};

exports.getSpecificBook = async (req, res, next) => {
  // Get details of books, book instances for specific book
  const book = await BookModel.findById(req.params.id).populate("author");
  const bookInstances = await BookInstanceModel.find({ book: req.params.id });

  if (book === null) {
    // No results.
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  res.render("book_detail", {
    title: book.title,
    book: book,
    book_instances: bookInstances,
  });
};

exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("No book-id provided");

    await BookModel.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Book successfully deleted",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("No book-id provided");

    const book = await BookModel.findByIdAndUpdate(id, { ...req.body });

    res.status(200).json({
      status: "success",
      message: "Book successfully updated",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

// Display detail page for a specific Genre.
exports.genre_detail = async (req, res, next) => {
  // Get details of genre and all associated books (in parallel)
  const [genre, booksInGenre] = await Promise.all([
    GenresModel.findById(req.params.id),
    BookModel.find({ genre: req.params.id }),
  ]);
  if (genre === null) {
    // No results.
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }

  res.render("genre_detail", {
    title: "Genre Detail",
    genre: genre,
    genre_books: booksInGenre,
  });
};
