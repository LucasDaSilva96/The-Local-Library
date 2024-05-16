const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const BookInstanceSchema = new mongoose.Schema({
  book: {
    type: mongoose.ObjectId,
    ref: "book",
    required: [true, "A book instance must be provided"],
  },
  imprint: String,
  status: {
    type: String,
    enum: ["maintenance", "available", "loaned"],
    required: [true, "Book status must be provided"],
    lowercase: true,
  },
  due_back: {
    type: Date,
  },

  url: String,
});

BookInstanceSchema.virtual("due_back_formatted").get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

const BookInstanceModel = mongoose.model("bookInstance", BookInstanceSchema);

module.exports = BookInstanceModel;
