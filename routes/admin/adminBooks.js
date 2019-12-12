const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const multer = require("multer");
const sharp = require("sharp");

const Book = require("../../models/Book");
const auth = require("../../middleware/auth");

//*======================================================================================

// @route     POST /adminBooks/add
// @desc      Add Book
// @access    Private
const validateBook = [
  check("name", "Book Name is required")
    .exists()
    .not()
    .isEmpty(),
  check("category", "Category Name is required")
    .exists()
    .not()
    .isEmpty(),
  check("author", "Author Name is required")
    .exists()
    .not()
    .isEmpty()
];

router.post("/add", auth, validateBook, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { name } = req.body;

  try {
    let book = await Book.findOne({ name });
    if (book) {
      return res.status(406).send({
        errors: [
          {
            msg: "Book Already Exists"
          }
        ]
      });
    }

    book = new Book(req.body);
    await book.save();
    book = await Book.findById(book._id)
      .populate("category")
      .populate("author")
      .exec();
    res.status(201).send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

//!======================================================================================

// @route     POST /adminBooks/addPhoto/:id
// @desc      Add photo to Book by book id
// @access    Private
//! upload book photo
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error("Please upload an image with jpg, jpeg or png format")
      );
    }
    cb(undefined, true);
  }
});

router.post(
  "/addPhoto/:id",
  auth,
  upload.single("photo"),
  async (req, res) => {
    //* (req.file.buffer) contains a buffer of all of the binary data for that file.
    //* sharp is async, it takes image and deal with it and we return it back as a buffer again.
    if (!req.file) {
      return res.status(404).send("Please Provide an Image");
    }
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    const { id } = req.params;
    const book = await Book.findOne({ _id: id });
    if (!book) {
      return res.status(404).send("The requested Book does not exist ??????");
    }
    book.photo = buffer;
    book.hasPhoto = true;
    await book.save();
    // res.send("Your Image uploaded Successfully");
    res.send(book);
  },
  (error, req, res, next) => {
    //* must provide these four args so express can understand that it's to handle errors
    res.status(400).send({ error: error.message });
  }
);

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
      return res.status(404).send("book not found or You're not authenticated");
    }
    updates.forEach((update) => (book[update] = req.body[update]));
    await book.save();

    const updatedBook = await Book.findById({ _id: id })
      .populate("category")
      .populate("author")
      .exec();
    res.send(updatedBook);
  } catch (error) {
    res.status(500).send(error);
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
