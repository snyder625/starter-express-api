import asyncHandler from "express-async-handler";

import userModel from "../models/userModel.js";

import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/ErrorHandler.js";

const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    next(new ErrorHandler("please login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await userModel.findById(decodedData.id);
  next();
});
const authRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
export { isAuthenticatedUser, authRoles };
