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
