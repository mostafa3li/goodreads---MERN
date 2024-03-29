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
    },
    hasPhoto: {
      type: Boolean
    },
    avgRating: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

// bookSchema.virtual("booksShelves", {
//   ref: "BookShelve",
//   localField: "_id",
//   foreignField: "bookId"
// });

// bookSchema.set("toJSON", { virtuals: true });
// bookSchema.set("toObject", { virtuals: true });

//*======================================================================================

//! manipulate book doc data before sending it
bookSchema.methods.toJSON = function() {
  const book = this;
  const bookObject = book.toObject();

  // delete bookObject.photo; //! not needed when using lean().populate
  delete bookObject.author.avatar;
  delete bookObject.author.id;
  delete bookObject.category.id;
  return bookObject;
};

//===================================================================

// bookSchema.pre("remove", { query: true, document: true }, function(doc, next) {
//   console.log("Removing doc!", doc);
//   next();
// });

//*======================================================================================

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
