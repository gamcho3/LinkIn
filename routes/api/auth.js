const express = require("express");
const router = express.Router(); //라우터만들기
const auth = require("../../middleware/auth"); //미들
const User = require("../../models/User"); //스키마
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
//get user
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(401).json({ msg: "error server" });
  }
});

//login
router.post(
  "/login",
  body("password", "password is required").exists(),
  body("email").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ msg: "invalid email" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ msg: "invalid password" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwt"), //jwt 키
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.json({ token }); //token출력
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(401).json({ msg: "error server" });
    }
  }
);

module.exports = router;
