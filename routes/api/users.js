const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
router.post(
  "/",
  body("name", "name is required").not().isEmpty(),
  body("email").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, name, password } = req.body;
    try {
      //email중복검사
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exist" }] });
      }

      user = new User({
        name,
        email,
        password,
      });

      user.password = await bcrypt.hash(password, 10);
      user.save();
      res.send("User register");
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
