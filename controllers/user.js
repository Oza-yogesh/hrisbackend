const { generateToken } = require("../middlewares/validateToken");
const Role = require("../models/RoleModel");
const userSchema = require("../models/userModel");
const bcrypt = require("bcrypt");
const signupUser = async (req, res) => {
  const { email, password, loginType,firstName, lastName } = req.body;
  try {
    // Check if the default user role exists
    let userRole = await Role.findOne({ name: 'user' });
    
    // If it doesn't exist, create it
    if (!userRole) {
      userRole = await Role.create({ name: 'user', permissions: [] });
      console.log("Default user role created!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user with the role ID
    const savedUser = await userSchema.create({
      loginType,
      email,
      password: hashedPassword,
      roleId: userRole._id, // Use the role ID here
      firstName,
      lastName
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
    const user = await userSchema.findOne({ email }).populate("roleId"); // Populate role information

    if (!user) {
      return res.status(404).json("User not found!");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json("Invalid password!");
    }

    const token = await generateToken({ user });

    return res.status(200).json({
      message: "Login Successfully!!",
      token: token,
      userId: user._id,
      name: user.name,
      role: user.roleId ? user.roleId.name : null,
      user : user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error!");
  }
};

module.exports = { signupUser, authenticateUser };
