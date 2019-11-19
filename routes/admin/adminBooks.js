const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Book = require("../../models/Book");
const auth = require("../../middleware/auth");

//*======================================================================================

// @route     POST /adminBooks/add
// @desc      Add Book
// @access    Private
const validateBook = [
  check("name", "Book name is required").exists(),
  check("category", "Category is required").exists(),
  check("author", "author name is required").exists()
];

router.post("/add", auth, validateBook, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { name, category, author, avatar } = req.body;

  try {
    let book = await Book.findOne({ name });
    if (book) {
      throw new Error("Book is already exists");
    }

    book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//!======================================================================================

// @route     PATCH /adminBooks/edit/:id
// @desc      Edit Book
// @access    Private
router.patch("/edit/:id", auth, validateBook, async (req, res) => {
  //*
  const allowedUpdates = ["name", "category", "author"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ errors: "invalid operation" });
  }
  //*

  const { id } = req.params;

  try {
    const book = await Book.findOne({ _id: id });
    if (!book) {
      return res.status(404).send("task not found or You're not authenticated");
    }
    updates.forEach((update) => (book[update] = req.body[update]));
    await book.save();
    res.send(book);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//!======================================================================================

// @route     DELETE /adminBooks/delete/:id
// @desc      DELETE Book
// @access    Private
router.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findOneAndDelete({ _id: id });
    if (!book) {
      res.status(404).send("Book not founded or You're not authenticated");
    }
    res.send(`"${book.name}" deleted Successfuly`);
  } catch (error) {
    res.status(500).send(error);
  }
});

//*======================================================================================

module.exports = router;
