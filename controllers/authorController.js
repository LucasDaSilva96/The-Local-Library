const AuthorModel = require("../models/authorSchema");
const BookModel = require("../models/bookSchema");

exports.renderCreateNewAuthor = (req, res, next) => {
  res.render("author_form", { title: "Create Author" });
};

exports.renderDeleteAuthor = async (req, res, next) => {
  const [author, allBooksByAuthor] = await Promise.all([
    AuthorModel.findById(req.params.id),
    BookModel.find({ author: req.params.id }),
  ]);

  if (author === null) {
    // No results.
    res.redirect("/catalog/authors");
  }

  res.render("author_delete", {
    title: "Delete Author",
    author: author,
    author_books: allBooksByAuthor,
  });
};

// TODO add more validation before creating a new author
exports.createNewAuthor = async (req, res, next) => {
  try {
    await AuthorModel.create({ ...req.body });
    // res.status(201).json({
    //   status: "success",
    //   message: "New author successfully created",
    // });
    res.redirect("/authors");
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getAllAuthors = async (req, res, next) => {
  const allAuthors = await AuthorModel.find().sort({ family_name: 1 });
  res.render("author_list", {
    title: "Author List",
    author_list: allAuthors,
  });
};

exports.getSpecificAuthor = async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const [author, allBooksByAuthor] = await Promise.all([
    AuthorModel.findById(req.params.id),
    BookModel.find({ author: req.params.id }),
  ]);

  if (author === null) {
    // No results.
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }

  res.render("author_detail", {
    title: "Author Detail",
    author: author,
    author_books: allBooksByAuthor,
  });
};

exports.deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) throw new Error("No author-id provided");
    await AuthorModel.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Author successfully deleted",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("No author-id provided");
    const author = await AuthorModel.findByIdAndUpdate(id, { ...req.body });

    res.status(200).json({
      status: "success",
      message: "Author successfully updated",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};
