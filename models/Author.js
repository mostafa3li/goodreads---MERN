const mongoose = require("mongoose");

//*======================================================================================

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: Date,
      default: Date.now,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number");
        }
      }
    },
    avatar: {
      type: Buffer
    }
  },
  {
    timestamps: true
  }
);

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
