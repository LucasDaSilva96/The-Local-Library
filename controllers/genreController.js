const { GenresModel } = require("../models/genresSchema");

exports.createNewGenre = async (req, res, next) => {
  try {
    await GenresModel.create({ ...req.body });

    res.status(201).json({
      status: "success",
      message: "Genres successfully created",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getAllGenres = async (req, res, next) => {
  try {
    const genres = await GenresModel.find();

    if (!genres) throw new Error("No genre in the database");

    res.status(200).json({
      status: "success",
      message: "Genres successfully fetched",
      data: genres,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.deleteGenre = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("No genre-id provided");

    await GenresModel.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Genre successfully deleted",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.updateGenre = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("No genre-id provided");

    await GenresModel.findByIdAndUpdate(id, { ...req.body });

    res.status(201).json({
      status: "success",
      message: "Genre successfully updated",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};
