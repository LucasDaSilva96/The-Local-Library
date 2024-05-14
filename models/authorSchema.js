const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Author first name must be provided"],
  },
  family_name: {
    type: String,
    required: [true, "Author family name must be provided"],
  },
  date_of_birth: {
    type: Date,
    required: [true, "Author date of birth must be provided"],
  },

  date_of_death: Date,

  name: String,
  lifespan: String,
  url: String,
});

AuthorSchema.virtual("fullName").get(function () {
  return this.first_name + " " + this.family_name;
});

const AuthorModel = mongoose.model("author", AuthorSchema);

module.exports = AuthorModel;
