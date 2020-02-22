const express = require("express");
const router = express.Router();

const Category = require("../../models/Category");
const auth = require("../../middleware/auth");

//*======================================================================================

// @route     GET /api/categories
// ?limit=5&skip=5      (pagination)
// ?sortBy=createdAt:asc  (sorting)
// @desc      Get all categories
// @access    Private
router.get("/", auth, async (req, res) => {
  const { limit, skip, sortBy } = req.query;
  const sort = {};

  if (sortBy) {
    const parts = sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    const categories = await Category.find({}, null, {
      limit: parseInt(limit),
      skip: parseInt(skip),
      sort
    }).lean();

    if (categories.length === 0) {
      throw new Error("You have no Categories yet");
    }

    const categoriesCount = await Category.estimatedDocumentCount();

    res.send({ categories, categoriesCount });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//!======================================================================================

// @route     GET /api/categories/:id
// @desc      Get category by id
// @access    Private
router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({ _id: id })
      .lean()
      .populate({
        path: "books",
        select: "name hasPhoto",
        populate: { path: "author", select: "name" }
      })
      .exec();
    if (!category) {
      return res.status(404).send({
        errors: [
          {
            msg: "Category Not Found"
          }
        ]
      });
    }
    // await category
    //   .populate({
    //     path: "books",
    //     select: "name hasPhoto",
    //     populate: { path: "author", select: "name" }
    //   })
    //   .execPopulate();
    res.send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

//*======================================================================================

module.exports = router;
