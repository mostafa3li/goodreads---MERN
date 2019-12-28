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
    },
    hasAvatar: {
      type: Boolean
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

authorSchema.set("toJSON", { virtuals: true });
authorSchema.set("toObject", { virtuals: true });

//*======================================================================================

//! manipulate author data before sending it
authorSchema.methods.toJSON = function() {
  const author = this;
  // convert doc to raw data (JS Object) that can be manipulated.
  const authorObject = author.toObject();
  // to not send duplicated id amongs the data sent to the user.
  // delete authorObject.id;
  // delete authorObject.avatar;
  // authorObject.books &&
  //   authorObject.books.map((book) => {
  //     delete book.photo;
  //   });
  return authorObject;
};

//*======================================================================================

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
