import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      unique: true,
    },
    desc: {
      type: String,
      required: false,
    },
    photo: {
      type: [String],
    },
    username: {
      type: String,
      required: false,
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
