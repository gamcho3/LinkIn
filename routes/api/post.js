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
      user: req.user.id,
      title,
      description,
    };
    try {
      const post = new Post(newPost);
      await post.save();
      res.status(201).json(post);
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
    return res.json(allPost);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "post no found" });
    }
    console.log(error.message);
    res.status(401).send("server error");
  }
});

// GET api/post
// GET post by id
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "post no found" });
    }
    res.json(post);
  } catch (error) {
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

//Post Id
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      res.status(400).json({ msg: "post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); //post id를 통해 post 검색
    console.log(req.user.id);
    post.likes = post.likes.filter(
      (like) => like.user.toString() !== req.user.id
    );

    await post.save();
    return res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/comment/:id", [
  auth,
  [
    body("text", "text is required").not().isEmpty(),
    body("password", "password required").isLength({ max: 4 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password"); //password를 제외하고 user를 출력
      const post = await Post.findById(req.params.id); //id에 맞는 post 출력

      const newComment = {
        text: req.body.text,
        password: req.body.password,
        name: user.name,
        user: req.user.id,
      };

      post.comments.push(newComment);
      post.save();
      return res.json(post.comments);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "server error" });
    }
  },
]);

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //코멘트 여부 확인
    if (!comment) {
      res.status(404).json({ msg: "comment is not existed" });
    }

    //user 체크
    if (comment.user.toString() !== req.user.id) {
      res.status(404).json({ msg: "user not correct" });
    }
    post.comments = post.comments.filter(
      (comment) => comment.id !== req.params.comment_id
    );
    await post.save();
    return res.json(post.comments);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

module.exports = router;
