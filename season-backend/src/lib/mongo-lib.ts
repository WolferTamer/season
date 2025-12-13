import Recipe from "../models/recipe.js";
import RecipeGroup from "../models/recipe-group.js";
import User from "../models/user.js";
import mongoose from "mongoose";

export default async function () {
  try {
    const uri = process.env.MONGOURI ?? "mongodb://localhost:27017/season";
    await mongoose.connect(uri);
    return "MongoDb connected successfully";
  } catch (e: any) {
    return e.message;
  }
}
