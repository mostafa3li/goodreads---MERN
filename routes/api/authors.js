const express = require("express");
const router = express.Router();

const Author = require("../../models/Author");
const auth = require("../../middleware/auth");

//*======================================================================================

// @route     GET /api/authors
// ?limit=5&skip=5      (pagination)
// ?sortBy=createdAt:asc  (sorting)
// @desc      Get all authors
// @access    Private
router.get("/", auth, async (req, res) => {
  const { limit, skip, sortBy } = req.query;
  const sort = {};

  if (sortBy) {
    const parts = sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    const authors = await Author.find({}, null, {
      limit: parseInt(limit),
      skip: parseInt(skip),
      sort
    })
      .lean()
      .select("-avatar");
    if (authors.length === 0) {
      throw new Error("You have no Authors yet");
    }

    const authorsCount = await Author.estimatedDocumentCount();

    res.send({ authors, authorsCount });
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
    const author = await Author.findOne({ _id: id })
      .lean()
      .select("-avatar")
      .populate({ path: "books", select: "name category hasPhoto" })
      .exec();
    if (!author) {
      return res.status(404).send({
        errors: [
          {
            msg: "Author Not Found"
          }
        ]
      });
    }
    // await author
    //   .populate({ path: "books", select: "name hasPhoto" })
    //   .execPopulate();
    res.send(author);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//!======================================================================================

// @route     GET /api/authors/:id/avatar
// @desc      Get Author photo by id
// @access    Public
//! get author image
router.get("/:id/avatar", async (req, res) => {
  const _id = req.params.id;
  try {
    const author = await Author.findById(_id);
    if (!author || !author.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png"); //* can be neglected, express do it automatically
    res.send(author.avatar);
  } catch (error) {
    res.status(404).send("User or image is not found");
  }
});

//*======================================================================================

module.exports = router;
