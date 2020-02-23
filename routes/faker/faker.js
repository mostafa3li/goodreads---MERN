const express = require("express");
const router = express.Router();
const faker = require("faker");

const Author = require("../../models/Author");
const Book = require("../../models/Book");
const Category = require("../../models/Category");

const auth = require("../../middleware/auth");

//*======================================================================================

//! categories
router.get("/faker/categs/:num", auth, async (req, res) => {
  let categories = [];
  try {
    for (let i = 0; i < req.params.num; i++) {
      let category = faker.random.word();

      existedCategory = await Category.findOne({ category });

      if (existedCategory) continue;

      category = new Category({ category });
      categories.push(category);
      await category.save();
    }
    res.status(201).send(categories);
  } catch (error) {
    res.status(400).send(error);
  }
});

//! authors
router.get("/faker/authors/:num", auth, async (req, res) => {
  let authors = [];
  try {
    for (let i = 0; i < req.params.num; i++) {
      let author = faker.name.findName();

      existedAuthor = await Author.findOne({
        name: author
      });

      if (existedAuthor) continue;

      author = new Author({ name: author, birthDate: faker.date.past() });
      authors.push(author);
      await author.save();
    }
    res.status(201).send(authors);
  } catch (error) {
    res.status(400).send(error);
  }
});

//! books
router.get("/faker/books/:num", auth, async (req, res) => {
  let books = [];
  try {
    for (let i = 0; i < req.params.num; i++) {
      // finding random category
      const categoriesCount = await Category.estimatedDocumentCount();
      const randomCategSkip = Math.floor(Math.random() * categoriesCount);
      let category = await Category.findOne().skip(randomCategSkip);

      // finding random author
      const authorsCount = await Author.estimatedDocumentCount();
      const randomAuthorSkip = Math.floor(Math.random() * authorsCount);
      let author = await Author.findOne().skip(randomAuthorSkip);
      let book = faker.lorem.words();

      existedBook = await Book.findOne({ name: book });

      if (existedBook) continue;

      book = new Book({
        name: book,
        category: category._id,
        author: author._id
      });
      books.push(book);
      await book.save();
    }
    res.status(201).send(books);
  } catch (error) {
    res.status(400).send(error);
  }
});

//*======================================================================================

module.exports = router;
