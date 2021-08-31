const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProfileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user", //user 스키마를 불러옴
  },
  address: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
        required: true,
      },
      current: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
