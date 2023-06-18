import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
    walletAddress: {
      type: "string",
    },
    isAdmin: {
      type: "boolean",
      default: false,
    },
  },
  { timestamps: true }
);
UserSchema.methods.getToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
