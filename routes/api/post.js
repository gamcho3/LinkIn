const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const User = require("../../models/User");
const { body, validationResult } = require("express-validator");
//POST api/post
// add post route
router.post(
  "/",
  [
    auth,
    [
      body("title", "title is required").isLength({ min: 4 }),
      body("description", "description is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
    }
    const { title, description } = req.body;
    const user = await User.findById(req.user.id).select("-password -email");
    const newPost = {
      user,
      title,
      description,
    };
    try {
      const post = new Post(newPost);
      await post.save();
      res.status(201).json({ post: post });
    } catch (error) {
      console.log(error.message);
      res.status(401).send("server error");
    }
  }
);

// GET api/post
// GET all post
router.get("/", async (req, res) => {
  try {
    const allPost = await Post.find().sort({ time: -1 });
    if (!allPost) {
      return res.status(400).json({ msg: "post no found" });
    }
    res.json(allPost);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "post no found" });
    }
    console.log(error.message);
    res.status(401).send("server error");
  }
});

//DELETE api/post/postid
//delete post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "post no found" });
    }
    if (post.user.toString() !== req.user.id) {
      //params.id 와 auth token으로 받은 userid 가 다르면
      res.status(401).json({ msg: "user not authorized" });
    }
    await post.remove();
    res.json({ msg: "remove success" });
  } catch (error) {
    console.log(error.message);
    res.status(401).send("server error");
  }
});

module.exports = router;
