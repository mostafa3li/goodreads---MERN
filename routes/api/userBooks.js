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
  check("book", "Book Id must be provided").exists(),
  check("category", "Category Id must be provided").exists(),
  check("author", "Author Id must be provided").exists()
];
router.post("/addBookShelve", auth, validateBookShelve, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { shelve, book, category, author } = req.body;
  const { _id } = req.user;

  try {
    // const existedUser = await User.findById(_id);
    // if (!existedUser) {
    //   return res.status(404).send({
    //     errors: [
    //       {
    //         msg: "User is not Exist"
    //       }
    //     ]
    //   });
    // }
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

    let existedBookShelve = await BookShelve.findOne({ user: _id, book });
    if (existedBookShelve) {
      // update book shelve
      existedBookShelve.shelve = shelve;
      await existedBookShelve.save();
      return res.status(200).send(existedBookShelve);
    }
    // create new shelve
    let newBookShelve = new BookShelve({
      shelve,
      book,
      user: _id,
      category,
      author
    });

    await newBookShelve.save();

    newBookShelve = await BookShelve.findOne({ book, user: _id })
      .lean()
      .populate({
        path: "book",
        select: "name category author"
      })
      .exec();

    res.status(201).send(newBookShelve);
  } catch (err) {
    res.status(500).send(err);
  }
});

//!======================================================================================
// @route     GET /api/users/addBookRating
// @desc      Add Rating to book
// @access    Private
const validateBookRating = [
  check("rating")
    .exists()
    .withMessage("Rating is required")
    .isIn(["1", "2", "3", "4", "5"])
    .withMessage("Rating value must be within '1' to '5'"),
  check("book", "Book Id must be provided").exists()
];
router.post("/addBookRating", auth, validateBookRating, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { rating, book } = req.body;
  const { _id } = req.user;

  try {
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

    if (!bookShelve) {
      return res.status(404).send({
        errors: [
          {
            msg: "This Book is not in your shelve to rate"
          }
        ]
      });
    }

    // add or update book rating
    bookShelve.rating = rating;
    await bookShelve.save();
    // res.status(200).send(bookShelve);

    bookShelve = await BookShelve.findOne({ book, user: _id })
      .lean()
      .populate({
        path: "book",
        select: "name category author"
      })
      .exec();

    res.status(201).send(bookShelve);
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

//!======================================================================================
/*
// @route     POST /api/users/rateBook
// @desc      Rate book by book id
// @access    Private
// const validateBookRating = [
//   check("rating")
//     .exists()
//     .withMessage("Book Rating is required")
//     .isIn(["1", "2", "3", "4", "5"])
//     .withMessage("Rating value must be within '1' to '5'")
// ];
// router.post(`/rateBook`, auth, validateBookRating, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json(errors);
//   }

//   const { rating, book } = req.body;
//   const { _id } = req.user;

//   try {
//   } catch (error) {}
// });
*/

// @route     GET /api/users/bookRating
// @desc      Get Book's overall rating
// @access    Private
// const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;
// router.get("/bookRating/:id", auth, async (req, res) => {
//   try {
//     const { id } = req.params;

//     const bookRating = await BookShelve.aggregate([
//       {
//         $group: {
//           _id: "$book",
//           avgRating: { $avg: "$rating" }
//         }
//       },
//       { $match: { _id: ObjectId(id) } }
//     ]);

//     const count = await BookShelve.countDocuments({
//       book: id,
//       rating: { $exists: true }
//     });

//     res.send(bookRating[0]);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

//*======================================================================================

module.exports = router;
