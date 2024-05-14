const express = require("express");
const { createNewBook, getAllBooks } = require("../controllers/bookController");

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", createNewBook);

module.exports = router;
