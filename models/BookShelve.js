const mongoose = require("mongoose");

//*======================================================================================

const shelves = Object.freeze({
  CurrentlyReading: "currently",
  WantToRead: "want",
  Read: "read"
});

const bookShelveSchema = new mongoose.Schema({
  shelve: [{ type: String, enum: Object.values(shelves), required: true }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Book"
  }
});

// bookShelveSchema.set("toJSON", { virtuals: true });
// bookShelveSchema.set("toObject", { virtuals: true });

//*======================================================================================

const BookShelve = mongoose.model("BookShelve", bookShelveSchema);

module.exports = BookShelve;