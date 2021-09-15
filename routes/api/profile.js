const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
//@route GET /api/profile
//@desc GET current profile
//@access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }) //스키마에서 설정한 user objectid
      .populate("user", ["name"]);
    if (!profile) {
      return res.status(400).json({ msg: "there is no profile" });
    }
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "server error" });
  }
});

//@route POST /api/profile
//@desc POST create or update
//@access Private
router.post(
  "/",
  [
    auth,
    [
      body("address", "address is required").not().isEmpty(),
      body("genres", "genres is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { address, genres, gender } = req.body;

    //profile 수정하기
    const profileFields = {};
    profileFields.user = req.user.id; //user목록에 id넣기
    profileFields.address = address;
    profileFields.gender = gender;
    if (genres) {
      profileFields.genres = genres.split(",").map((genre) => genre.trim());
    }

    try {
      //프로파일 업데이트
      let profile = await Profile.findOne({ user: req.user.id }); //auth-token id에 맞는 프로파일 찾기
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        res.json(profile);
      } else {
        //create 프로파일
        profile = new Profile(profileFields); //객체넣기
        await profile.save(); //데이터 저장
        res.json(profile);
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("server error");
    }
  }
);

//@route GET /api/profile
//@desc GET all profile
//@access public

router.get("/", async (req, res) => {
  try {
    const profile = await Profile.find().populate("user", ["name"]);
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("server error");
  }
});

//@route GET /api/profile/user/:user_id
//@desc GET profile by id
//@access public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name"]);
    //params를 통해 id 입력
    if (!profile) {
      return res
        .status(400)
        .json({ msg: "no profile please enter correct id" });
    }
    return res.json(profile);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(400).json({ msg: "profile not found" });
    }
    res.status(500).json("server error");
  }
});

//@route post api/profile/delete
//@desc delete profile user,post
//@access private

router.post(
  "/delete",
  [auth, [body("password", "password is not correct").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    try {
      const user = await User.findById(req.user.id);
      const { password } = req.body;
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(404).json({ msg: "Invalid Credentials" });
      }
      //remove profile
      await Profile.findOneAndRemove({ user: req.user.id });
      //remove user
      await User.findOneAndRemove({ _id: req.user.id });
      res.json({ msg: "success delete" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "server error", error: error.message });
    }
  }
);

//@route PUT api/profile/experience
//@desc add profile experience
//@access private
router.put(
  "/experience",
  [
    auth,
    [
      body("title", "title is required").not().isEmpty(),
      body("from", "date is required")
        .notEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, from, to, current } = req.body; //입력된값 불러오기
    const newExp = {
      //값 저장
      title,
      from,
      to,
      current,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).send("server errors");
    }
  }
);
//@route delete api/profile/experience
//@desc delete profile experience
//@access private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //remove index
    const removeIndex = profile.experience
      .map((exp) => exp.id)
      .indexOf(req.params.exp_id); //exp의 id를 배열로 만든다음 지우고자 하는 id의 index값 구하기

    profile.experience.splice(removeIndex, 1); //인덱스에 1개 지우기
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
