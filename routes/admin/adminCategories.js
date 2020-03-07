const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Category = require("../../models/Category");
const Book = require("../../models/Book");
const BookShelve = require("../../models/BookShelve");
const auth = require("../../middleware/auth");

//*======================================================================================

// @route     POST /adminCategories/add
// @desc      Add Category
// @access    Private
const validateCategory = [
  check("category")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Catogory must be provided")
];

router.post("/add", auth, validateCategory, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let category = await Category.findOne({ category: req.body.category });

    if (category) {
      return res.status(406).send({
        errors: [
          {
            msg: "Category Already Exists"
          }
        ]
      });
    }

    category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

//!======================================================================================

// @route     PATCH /adminCategories/edit/:id
// @desc      Edit Category
// @access    Private
router.patch("/edit/:id", auth, validateCategory, async (req, res) => {
  //*
  const allowedUpdates = ["category"];
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
    const category = await Category.findOne({ _id: id });
    if (!category) {
      return res
        .status(404)
        .send("Category not found or You're not authenticated");
    }
    const existedCategory = await Category.findOne({
      category: req.body.category
    });
    if (existedCategory) {
      return res.status(406).send({
        errors: [
          {
            msg: "Category Already Exists"
          }
        ]
      });
    }
    updates.forEach((update) => (category[update] = req.body[update]));
    await category.save();
    res.send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

//!======================================================================================

// @route     DELETE /adminCategories/delete/:id
// @desc      DELETE Category
// @access    Private
router.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findOneAndDelete({ _id: id });
    if (!category) {
      res.status(404).send("Category not founded or You're not authenticated");
    }

    // delete all books under this category from all users shelves
    await BookShelve.deleteMany({ category: id });

    // delete all books under this category
    await Book.deleteMany({ category: id });

    res.send(
      `Category "${category.category}" & all related Books has been Deleted Successfuly`
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

//*======================================================================================

module.exports = router;
