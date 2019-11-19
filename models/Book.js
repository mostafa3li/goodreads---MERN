const mongoose = require("mongoose");

//*======================================================================================

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category"
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Author"
    },
    photo: {
      type: Buffer
    }
  },
  {
    timestamps: true
  }
);

//*======================================================================================

//! manipulate book data before sending it
bookSchema.methods.toJSON = function() {
  const book = this;
  const bookObject = book.toObject();

  delete bookObject.photo;
  return bookObject;
};

//*======================================================================================

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
