const User=require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwttoken=process.env.JWT_SERECT;
const auth={};
auth.register = async (req, res) => {
    const { username, email, password} = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedpassword = await bcrypt.hash(password, 10);
      const user = await User({
        username,
        email,
        password: hashedpassword,
      });
      await user.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  auth.login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          
        },
            jwttoken,
        { expiresIn: "10h" }
      );
  
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          email: user.email,
          
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

module.exports= auth;