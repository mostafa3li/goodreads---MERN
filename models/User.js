const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const JWT_SECRET = config.get("JWT_SECRET");

//*======================================================================================

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    avatar: {
      Type: Buffer
    }
  },
  {
    timestamps: true
  }
);

// userSchema.virtual("booksShelves", {
//   ref: "BookShelve",
//   localField: "_id",
//   foreignField: "user"
// });

// userSchema.set("toJSON", { virtuals: true });
// userSchema.set("toObject", { virtuals: true });

//*======================================================================================

//! manipulate user data before sending it
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject(); // raw data that can be manipulated.
  // to not send password and token amongs the data sent to the user.
  /**
   * delete userObject.id;
   * ! will not be used if i'm using lean()
   */
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

//! generate token
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  return token;
};

//===================================================================

//! custom find Admin
userSchema.statics.findAdmin = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error();
  }

  if (!user.isAdmin) {
    throw new Error();
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error();
  }

  return user;
};

//! custom find User
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) return false;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return false;

  return user;
};

//===================================================================

//! hashing plain-text password middleware before save
userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

//*======================================================================================

const User = mongoose.model("User", userSchema);

module.exports = User;
