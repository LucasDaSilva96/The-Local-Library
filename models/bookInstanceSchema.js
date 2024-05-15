const mongoose = require("mongoose");

const BookInstanceSchema = new mongoose.Schema({
  book: {
    type: mongoose.ObjectId,
    ref: "books",
    required: [true, "A book instance must be provided"],
  },
  imprint: String,
  status: {
    type: String,
    enum: ["loaned out", "in stock"],
    required: [true, "Book status must be provided"],
    lowercase: true,
  },
  due_back: {
    type: Date,
  },

  url: String,
});

const BookInstanceModel = mongoose.model("bookInstance", BookInstanceSchema);

module.exports = BookInstanceModel;
