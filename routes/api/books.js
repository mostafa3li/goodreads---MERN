const express = require("express");
const router = express.Router();

const Book = require("../../models/Book");
const auth = require("../../middleware/auth");

//*======================================================================================

// @route     GET /api/books
// @desc      get all Books
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const books = await Book.find()
      .populate("category")
      .populate("author")
      .exec();
    if (books.length === 0) {
      throw new Error("You have no books yet");
    }
    res.send(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//!======================================================================================

// @route     GET /api/books/:id
// @desc      Get Book by id
// @access    Private
router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findOne({ _id: id });
    if (!book) {
      throw new Error("Book not found");
    }
    res.send(book);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//*======================================================================================

module.exports = router;
