const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Author = require("../../models/Author");
const auth = require("../../middleware/auth");

//*======================================================================================

// @route     POST /adminAuthors/add
// @desc      Add Author
// @access    Private
const validateAuthor = [
  check("name", "Author name is required").exists(),
  check("birthDate", "Valid Date format is YYYY-MM-DD")
    .isISO8601()
    .optional()
];

router.post("/add", auth, validateAuthor, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  try {
    let author = await Author.findOne({ name: req.body.name });

    if (author) {
      throw new Error("Author is already exists");
    }

    author = new Author(req.body);
    await author.save();
    res.status(201).send(author);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//!======================================================================================

// @route     PATCH /adminAuthors/edit/:id
// @desc      Edit Author
// @access    Private
router.patch("/edit/:id", auth, validateAuthor, async (req, res) => {
  //*
  const allowedUpdates = ["name", "birthDate", "avatar"];
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
    const author = await Author.findOne({ _id: id });
    if (!author) {
      return res
        .status(404)
        .send("author not found or You're not authenticated");
    }
    updates.forEach((update) => (author[update] = req.body[update]));
    await author.save();
    res.send(author);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//!======================================================================================

// @route     DELETE /adminAuthors/delete/:id
// @desc      DELETE Category
// @access    Private
router.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findOneAndDelete({ _id: id });
    if (!author) {
      res.status(404).send("Author not founded or You're not authenticated");
    }
    res.send(`"${author.name}" deleted Successfuly`);
  } catch (error) {
    res.status(500).send(error);
  }
});

//*======================================================================================

module.exports = router;
