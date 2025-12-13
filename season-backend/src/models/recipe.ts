import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ratings: { type: [Number], required: false },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    steps: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
