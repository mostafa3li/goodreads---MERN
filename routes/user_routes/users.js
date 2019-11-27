const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @route     GET /users/me
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

module.exports = router;
