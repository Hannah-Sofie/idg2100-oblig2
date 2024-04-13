const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      lowercase: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    department: String,
    university: String,
    position: {
      type: String,
      enum: ["student", "teacher", "TA", "other"],
      default: "teacher",
    },
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);

module.exports = mongoose.model("User", userSchema);
