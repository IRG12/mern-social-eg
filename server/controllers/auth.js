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

/* Logging In */
export const login = async (req, res) => {
  try {
    // grabbing user email and password
    const { email, password } = req.body;
    // grabbing all info associated with this email
    const user = await User.findOne({ email: email });
    // if user is not registered, throw an error
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    // verifying password
    const isMatch = await bcrypt.compare(password, user.password);
    // wrong password, throw an error
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // if email and password is successful, give a token to the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // delete password so it does not get sent to Front End
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
