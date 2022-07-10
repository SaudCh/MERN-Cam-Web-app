import mongoose from "mongoose";

const CreationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    artist: {
      type: String,
      // required: true,
    },

    img: {
      type: [String],
      // required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      // required: true,
    }

  },
  { timestamps: true }
);

export default mongoose.model("Creation", CreationSchema);
