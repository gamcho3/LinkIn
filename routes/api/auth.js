const express = require("express");
const router = express.Router(); //라우터만들기

router.get("/", (req, res) => {
  res.send("auth route");
});

module.exports = router;
