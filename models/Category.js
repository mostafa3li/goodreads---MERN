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

//*======================================================================================

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
