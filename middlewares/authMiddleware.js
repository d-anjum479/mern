import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

// route protected with token
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(`Error in requireSignIn middleware - ${error}`);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user.role);

    if (user.role !== 1) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized access" });
    } else {
      next();
    }
  } catch (error) {
    console.log(`Error in isAdmin middleware - ${error}`);
  }
};
