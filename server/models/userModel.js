import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    like:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    }],
    dislike:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    }],
    comment:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    }],
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
