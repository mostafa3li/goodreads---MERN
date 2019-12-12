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

//!======================================================================================

// @route     GET /api/books/:id/photo
// @desc      Get Book photo by id
// @access    Public
//! get book image
router.get("/:id/photo", async (req, res) => {
  const _id = req.params.id;
  try {
    const book = await Book.findById(_id);
    if (!book.photo) {
      throw new Error();
    }
    res.set("Content-Type", "image/png"); //* can be neglected, express do it automatically
    res.send(book.photo);
  } catch (error) {
    res.status(404).send("User or image is not found");
  }
});

//*======================================================================================

module.exports = router;
