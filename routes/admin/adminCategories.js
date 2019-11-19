const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Category = require("../../models/Category");
const auth = require("../../middleware/auth");

//*======================================================================================

// @route     POST /adminCategories/add
// @desc      Add Category
// @access    Private
const validateCategory = [
  check("category", "Catogory must be provided").exists()
];

router.post("/add", auth, validateCategory, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  try {
    let category = await Category.findOne({ category: req.body.category });

    if (category) {
      throw new Error("Category is already exists");
    }

    category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error.message);
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
      return res.status(404).send("task not found or You're not authenticated");
    }
    updates.forEach((update) => (category[update] = req.body[update]));
    await category.save();
    res.send(category);
  } catch (error) {
    res.status(500).send(error.message);
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
    res.send(`"${category.category}" Category deleted Successfuly`);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
