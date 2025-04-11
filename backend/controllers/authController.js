const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = new User({ username: req.body.username, password: hashed });
  await user.save();
  res.json({ message: "User registered" });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!user || !valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};
