const express = require("express");
const router = express.Router();

const Category = require("../../models/Category");
const auth = require("../../middleware/auth");

//*======================================================================================

// @route     GET /api/categories
// @desc      Get all categories
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      throw new Error("You have no Categories yet");
    }
    res.send(categories);
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
    const category = await Category.findOne({ _id: id });
    if (!category) {
      return res.status(404).send({
        errors: [
          {
            msg: "Category Not Found"
          }
        ]
      });
    }
    await category
      .populate({
        path: "books",
        select: "name hasPhoto",
        populate: { path: "author", select: "name" }
      })
      .execPopulate();
    res.send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

//*======================================================================================

module.exports = router;
