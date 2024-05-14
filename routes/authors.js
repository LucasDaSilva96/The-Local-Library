const express = require("express");

const {
  createNewAuthor,
  getAllAuthors,
} = require("../controllers/authorController");

const router = express.Router();

router.get("/", getAllAuthors);
router.post("/", createNewAuthor);

module.exports = router;
