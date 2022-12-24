// help us encrypt our password
import bcrypt from "bcrypt";
// will send a token to help user. Authorization
import jwt from "jsonwebtoken";
// Your data structured
import User from "../models/User.js";

/* Register User */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    /* Encrypting password */
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // create a new User
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    // If nothing errors out in this process, User is saved
    const savedUser = await newUser.save();
    register.status(201).json(savedUser);
  } catch (err) {
    // gives an error message if this process fails
    register.status(500).json({ error: err.message });
  }
};
