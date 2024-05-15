const BookInstanceModel = require("../models/bookInstanceSchema");

exports.createNewBookInstance = async (req, res, next) => {
  try {
    await BookInstanceModel.create({ ...req.body });

    res.status(201).json({
      status: "success",
      message: "New book instance successfully created",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getAllBookInstances = async (req, res, next) => {
  try {
    const bookInstances = await BookInstanceModel.find();

    if (!bookInstances)
      throw new Error("No book instance found in the database");

    res.status(200).json({
      status: "success",
      message: "Book instances successfully fetched",
      data: bookInstances,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getSpecificBookInstance = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("No book instance id provided");

    const bookInstance = await BookInstanceModel.findById(id);

    res.status(200).json({
      status: "success",
      message: "Book instance successfully fetched",
      data: bookInstance,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
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
