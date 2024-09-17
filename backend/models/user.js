const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide Nmae"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Provide Email"],
    },
    password: {
      type: String,
      required: [true, "Provide Password"],
    },
    profile_pic_url: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
