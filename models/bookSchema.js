const mongoose = require("mongoose");
const GenresSchema = require("./genresSchema");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title must be provided"],
  },
  author: {
    type: mongoose.ObjectId,
    ref: "authors",
    required: [true, "Book author must be provided"],
  },
  summary: {
    type: String,
    required: [true, "Book summary must be provided"],
  },
  ISBN: {
    type: String,
    required: [true, "Book ISBN must be provided"],
  },
  genres: [GenresSchema],

  url: String,
});

const BookModel = mongoose.model("book", BookSchema);

module.exports = BookModel;
