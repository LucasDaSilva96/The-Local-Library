const BookInstanceModel = require("../models/bookInstanceSchema");
const BookModel = require("../models/bookSchema");

exports.renderCreateNewBookInstance = async (req, res, next) => {
  const allBooks = await BookModel.find().sort({ title: 1 });

  res.render("bookinstance_form", {
    title: "Create BookInstance",
    book_list: allBooks,
  });
};

exports.createNewBookInstance = async (req, res, next) => {
  try {
    await BookInstanceModel.create({ ...req.body });

    // res.status(201).json({
    //   status: "success",
    //   message: "New book instance successfully created",
    // });

    res.redirect("/bookInstances");
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getAllBookInstances = async (req, res, next) => {
  const allBookInstances = await BookInstanceModel.find().populate("book");

  res.render("bookinstance_list", {
    title: "Book Instance List",
    bookinstance_list: allBookInstances,
  });
};

exports.getSpecificBookInstance = async (req, res, next) => {
  const bookInstance = await BookInstanceModel.findById(req.params.id).populate(
    "book"
  );
  if (bookInstance === null) {
    // No results.
    const err = new Error("Book copy not found");
    err.status = 404;
    return next(err);
  }

  res.render("bookinstance_detail", {
    title: "Book:",
    bookinstance: bookInstance,
  });
};

exports.deleteBookInstance = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("No book instance id provided");

    await BookInstanceModel.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Book instance successfully deleted",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.updateBookInstance = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("No book instance id provided");

    const bookInstance = await BookInstanceModel.findByIdAndUpdate(id, {
      ...req.body,
    });

    res.status(200).json({
      status: "success",
      message: "Book instance successfully updated",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};
