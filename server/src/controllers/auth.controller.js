const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check user already in there
    const user = await User.findOne(email);
    if (user) {
      return res.json(400).json({ message: "Email is already exists." });
    }

    // Hashing password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    console.error("Error doing register");
    res.status(500).json({ message: "Error doing register" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check user in there
    const user = await User.findOne(email);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // decrypt password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password, try again!" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({message:"Login successfully",token});
    
  } catch (error) {
    console.error("Error doing login");
    res.status(500).json({ message: "Error doing login" });
  }
};

module.exports = {
  register,
  login,
};
