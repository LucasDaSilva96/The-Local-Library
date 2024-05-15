const BookModel = require("../models/bookSchema");

// TODO Add more validation before creating a new book
exports.createNewBook = async (req, res, next) => {
  try {
    await BookModel.create({ ...req.body });
    res.status(201).json({
      status: "success",
      message: "New book successfully created",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await BookModel.find();
    res.status(201).json({
      status: "success",
      message: "Books successfully fetched",
      data: books,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getSpecificBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("No book-id provided");

    const book = await BookModel.findById(id);

    if (!book) throw new Error("No book found with the provided id.");

    res.status(200).json({
      status: "success",
      message: "Book successfully fetched",
      data: book,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
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
