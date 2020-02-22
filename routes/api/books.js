const express = require("express");
const router = express.Router();

const Book = require("../../models/Book");
const auth = require("../../middleware/auth");

//*======================================================================================

// @route     GET /api/books
// @desc      get all Books
// ?limit=5&skip=5      (pagination)
// ?sortBy=createdAt:asc  (sorting)
// @access    Private
router.get("/", auth, async (req, res) => {
  const { limit, skip, sortBy } = req.query;
  const sort = {};

  if (sortBy) {
    const parts = sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  // sort: {
  //   createdAt: -1 (desc),
  //   name: 1 (asc)
  // }

  try {
    const books = await Book.find({}, null, {
      limit: parseInt(limit),
      skip: parseInt(skip),
      sort
    })
      .lean()
      .select("-photo")
      .populate({ path: "category", select: "category" })
      .populate({ path: "author", select: "name hasAvatar" })
      .exec();

    if (books.length === 0) {
      throw new Error("You have no books yet");
    }
    const booksCount = await Book.estimatedDocumentCount();
    res.send({ books, booksCount });
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
    const book = await Book.findOne({ _id: id })
      .lean()
      .select("-photo")
      .populate({ path: "author", select: "name" })
      .populate({ path: "category", select: "category" })
      .exec();
    if (!book) {
      return res.status(404).send({
        errors: [
          {
            msg: "Book Not Found"
          }
        ]
      });
    }
    // await book
    //   .populate({ path: "author", select: "name" })
    //   .populate({ path: "category", select: "category" })
    //   .execPopulate();
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
