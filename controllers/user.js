const { generateToken } = require("../middlewares/validateToken");
const userSchema = require("../models/userModel");
const bcrypt = require("bcrypt");

const signupUser = async (req, res) => {
  const { email, password, loginType } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const savedUser = await userSchema.create({
      loginType,
      email,
      password: hashedPassword,
    });

    if (savedUser) return res.status(200).json("Signup successful!");
  } catch (error) {
    console.error(error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json("Email already exists!");
    } else {
      return res.status(500).json("Sign-up error!");
    }
  }
};

const authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(404).json("User not found!");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json("Invalid password!");
    }
    const token = await generateToken({ userId: user._id });
    return res.status(200).json({ token: token, userId: user._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error!");
  }
};

module.exports = { signupUser, authenticateUser };
