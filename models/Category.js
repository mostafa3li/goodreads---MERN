const mongoose = require("mongoose");

//*======================================================================================

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

categorySchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "category"
});

// categorySchema.virtual("booksNum", {
//   ref: "Book",
//   localField: "_id",
//   foreignField: "category",
//   count: true //! return docs count only
// });

categorySchema.set("toJSON", { virtuals: true });
//! because virtuals are not included in toJSON() output by default
categorySchema.set("toObject", { virtuals: true });

//*======================================================================================

//! manipulate category data before sending it
categorySchema.methods.toJSON = function() {
  const category = this;
  // convert doc to raw data (JS Object) that can be manipulated.
  const categoryObject = category.toObject();
  // to not send duplicated id amongs the data sent to the user.
  // delete categoryObject.id;
  // categoryObject.books &&
  //   categoryObject.books.map((book) => {
  //     delete book.author.id;
  //   });
  return categoryObject;
};

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
