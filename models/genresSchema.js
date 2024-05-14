const mongoose = require("mongoose");

const GenresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Genre name must be provided"],
    enum: [
      "action",
      "animation",
      "comedy",
      "crime",
      "drama",
      "experimental",
      "fantasy",
      "historical",
      "horror",
      "romance",
      "science fiction",
      "thriller",
      "western",
      "other",
    ],
  },
  url: String,
});

module.exports = GenresSchema;
