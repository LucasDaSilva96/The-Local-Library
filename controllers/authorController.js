const AuthorModel = require("../models/authorSchema");

// TODO add more validation before creating a new author
exports.createNewAuthor = async (req, res, next) => {
  try {
    await AuthorModel.create({ ...req.body });
    res.status(201).json({
      status: "success",
      message: "New author successfully created",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getAllAuthors = async (req, res, next) => {
  try {
    const authors = await AuthorModel.find();
    res.status(200).json({
      status: "success",
      message: "Authors successfully fetched",
      data: authors,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getSpecificAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("No author-id provided");
    const author = await AuthorModel.findById(id);

    if (!author) throw new Error("No author found with the provided id");

    res.status(200).json({
      status: "success",
      message: "Author successfully fetched",
      data: author,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
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
