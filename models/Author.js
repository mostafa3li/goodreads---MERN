const mongoose = require("mongoose");

//*======================================================================================

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    },
    birthDate: {
      type: Date,
      default: new Date().toISOString().split("T")[0]
      // validate(value) {
      //   if (value < Date.now) {
      //     throw new Error("Birth Date is invalid");
      //   }
      // }
    },
    avatar: {
      type: Buffer
    }
  },
  {
    timestamps: true
  }
);

authorSchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "author"
});

//*======================================================================================

//! manipulate author data before sending it
authorSchema.methods.toJSON = function() {
  const author = this;
  const authorObject = author.toObject();

  delete authorObject.avatar;
  return authorObject;
};

//*======================================================================================

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
