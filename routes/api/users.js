const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const multer = require("multer");
const sharp = require("sharp");

const User = require("../../models/User");
const auth = require("../../middleware/auth");

//*======================================================================================

// @route     GET /api/users/me
// @desc      Get user's data
// @access    Private
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.send(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//!======================================================================================

// @route     GET /api/users/register
// @desc      Register New User
// @access    Public
const validateUserRegistery = [
  check("name", "Name is required").exists(),
  check("email", "Please include a valid email.").isEmail(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Please enter a password of 6 or more characters")
    .not()
    .contains("password")
    .withMessage("password must not contains password"),
  check("isAdmin")
    .not()
    .exists()
    .withMessage("you're not an Admin! are you lost?")
];
router.post("/register", validateUserRegistery, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(406).send({ errors: [{ msg: "User Already Exists" }] });
    }

    user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//!======================================================================================

// @route     POST /api/users/login
// @desc      Login as User
// @access    Public
const validateUserLogin = [
  check("email", "Please include a valid email.")
    .exists()
    .isEmail(),
  check("password")
    .exists()
    .matches(/^(\w+\S+)$/)
    .withMessage("Password is required.")
];

router.post("/login", validateUserLogin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(404).send({
        errors: [
          {
            msg: "User or Password is incorrect"
          }
        ]
      });
    }
    const token = await user.generateAuthToken();
    await user.save();
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(500).send(err);
  }
});

//!======================================================================================

// @route     POST /api/users/addAvatar/:id
// @desc      Add avatar to User by user id
// @access    Private
//! upload user image
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error("Please upload an image with jpg, jpeg or png format")
      );
    }
    cb(undefined, true);
  }
});

router.post(
  "/addAvatar/:id",
  upload.single("avatar"),
  async (req, res) => {
    if (!req.file) {
      return res.status(404).send("Please Provide an Image");
    }
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 350 })
      .png()
      .toBuffer();

    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).send("The requested User does not exist ??????");
    }
    user.avatar = buffer;
    // user.hasAvatar = true;
    await user.save();
    res.send(user);
  },
  (error, req, res, next) => {
    res.status(400).send(error);
  }
);

//*======================================================================================

module.exports = router;
