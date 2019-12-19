const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

//*======================================================================================

// @route     POST /adminAuth/createAdmin
// @desc      Register Admin
// @access    Public
const validateAdminRegistery = [
  check("name", "Name is required").exists(),
  check("email", "Please include a valid email.").isEmail(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Please enter a password with 6 or more characters")
    .not()
    .contains("password")
    .withMessage("password must not contains password"),
  check("isAdmin")
    .not()
    .exists()
    .withMessage(`You can't add "isAdmin" as a hardcoded property`)
];

router.post("/createAdmin", validateAdminRegistery, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({ errors: { msg: "User already Exists" } });
    }

    // setting the user as Admin
    req.body.isAdmin = true;

    user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//!======================================================================================

// @route     POST /adminAuth/login
// @desc      Login as Admin
// @access    Public
const validateAdminLogin = [
  check("email", "Please include a valid email.")
    .exists()
    .isEmail(),
  check("password")
    .exists()
    .matches(/^(\w+\S+)$/)
    .withMessage("Password is required.")
];

router.post("/login", validateAdminLogin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findAdmin(email, password);
    const token = await user.generateAuthToken();
    await user.save();
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(500).send({
      errors: [
        {
          msg: "User or Password is incorrect OR you're not authorized as ADMIN"
        }
      ]
    });
  }
});

//!======================================================================================

// @route     POST /adminAuth/logout
// @desc      Logout as Admin (current session)
// @access    Private
router.post("/logout", auth, async (req, res) => {
  try {
    const { user } = req;
    user.tokens = user.tokens.filter((token) => token.token !== req.token);
    await user.save();
    res.send("Successfully logged out");
  } catch (error) {
    res.status(500).send(error);
  }
});

//!======================================================================================

// @route     POST /adminAuth/logoutAll
// @desc      Logout as Admin (all sessions)
// @access    Private
router.post("/logoutAll", auth, async (req, res) => {
  try {
    const { user } = req;
    user.tokens = [];
    await user.save();
    res.status(200).send("Successfully logged out from all devices");
  } catch (error) {
    res.status(500).send(error);
  }
});

//*======================================================================================

module.exports = router;
