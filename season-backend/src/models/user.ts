import mongoose from "mongoose";

interface IUser {
  _id: string;
  username: string;
  email: string;
  encrypted_password: string;
  reset_password_token: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    encrypted_password: { type: String, required: true, select: false },
    reset_password_token: { type: Number, required: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const model: mongoose.Model<IUser> = mongoose.model("User", userSchema);

export default model;
