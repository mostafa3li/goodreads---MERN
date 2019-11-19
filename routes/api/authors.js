const express = require("express");
const router = express.Router();

const Author = require("../../models/Author");
const auth = require("../../middleware/auth");

//*======================================================================================

// @route     GET /api/authors
// @desc      Get all authors
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const authors = await Author.find();
    if (authors.length === 0) {
      throw new Error("You have no Categories yet");
    }
    res.send(authors);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//!======================================================================================

// @route     GET /api/authors/:id
// @desc      Get Author by id
// @access    Private
router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findOne({ _id: id });
    if (!author) {
      throw new Error("Author not found");
    }
    res.send(author);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//*======================================================================================

module.exports = router;
