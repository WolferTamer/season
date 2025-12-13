import mongoose from "mongoose";

const themeSchema = new mongoose.Schema({
  color: String,
  font: String,
});

const groupSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
      default: [],
    },
    theme: { type: themeSchema, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("RecipeGroup", groupSchema);
