import { User } from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";

export const registerController = async (req, res) => {
  try {
    const { fName, email, password, answer } = req.body;
    if (!fName || !email || !password || !answer) {
      return res
        .status(200)
        .send({ success: false, message: "All fields are required" });
    }
    // check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(200)
        .send({ success: false, message: "Email already exists. Try login" });
    }
    // hashing password
    const hashedPassword = await hashPassword(password);
    // registering new user
    const newUser = await new User({
      fName,
      email,
      answer,
      password: hashedPassword,
    }).save();

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(`Error in registerController - ${error}`);
    res
      .status(500)
      .send({ success: false, message: "Error in registerController", error });
  }
};
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(200)
        .send({ success: false, message: "All fields are required" });
    }
    // checking user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: "Email not registered" });
    }
    // comparing password
    const correctPassword = await comparePassword(password, user.password);

    if (!correctPassword) {
      return res
        .status(200)
        .send({ success: false, message: "Incorrect password" });
    }

    return res.status(201).send({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.log(`Error in loginController - ${error}`);
    res
      .status(500)
      .send({ success: false, message: "Error in loginController", error });
  }
};
