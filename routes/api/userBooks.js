const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
const Book = require("../../models/Book");
const BookShelve = require("../../models/BookShelve");
const auth = require("../../middleware/auth");

//!======================================================================================

// @route     POST /api/users/addBookShelve
// @desc      Add book to shelve ['currently', 'want', 'read']
// @access    Private
const validateBookShelve = [
  check("shelve")
    .exists()
    .withMessage("Book Shelve is required")
    .isIn(["currently", "want", "read"])
    .withMessage("shelve value must be 'currently', 'want' or 'read'"),
  check("book", "Book Id must be provided").exists()
];
router.post("/addBookShelve", auth, validateBookShelve, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { shelve, book } = req.body;
  const { _id } = req.user;

  try {
    const existedUser = await User.findById(_id);
    if (!existedUser) {
      return res.status(404).send({
        errors: [
          {
            msg: "User is not Exist"
          }
        ]
      });
    }
    const existedBook = await Book.findById(book);
    if (!existedBook) {
      return res.status(404).send({
        errors: [
          {
            msg: "Book is not Exist"
          }
        ]
      });
    }

    let bookShelve = await BookShelve.findOne({ user: _id, book });
    if (bookShelve) {
      // update book shelve
      bookShelve.shelve = shelve;
      await bookShelve.save();
      return res.status(200).send(bookShelve);
    }
    // create new shelve
    bookShelve = new BookShelve({ shelve, book, user: _id });
    await bookShelve.save();
    const newBook = await BookShelve.find({ book, user: _id })
      .lean()
      .populate({
        path: "book",
        select: "name category author"
      })
      .exec();
    res.status(201).send(newBook);
  } catch (err) {
    res.status(500).send(err);
  }
});

//!======================================================================================

// @route     GET /api/users/bookshelves
// @desc      Get all user books shelves
// @access    Private
router.get("/bookshelves", auth, async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id).lean();
    if (!user) {
      return res.status(404).send({
        errors: [
          {
            msg: "User is not Exist"
          }
        ]
      });
    }
    const books = await BookShelve.find({ user: req.user._id })
      .lean()
      .populate({
        path: "book",
        select: "name category author hasPhoto",
        populate: {
          path: "author",
          select: "name"
        }
      })
      .exec();

    if (books.length === 0) {
      return res.status(404).send({
        errors: [
          {
            msg: "No Shelves in your Library"
          }
        ]
      });
    }
    res.send(books);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//*======================================================================================

module.exports = router;
