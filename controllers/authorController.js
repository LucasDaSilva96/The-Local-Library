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
