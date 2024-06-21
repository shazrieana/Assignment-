const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash, email });

    await user.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send('Username not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Wrong password');
    }

    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.send(user);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { email } = req.body;
    await User.findByIdAndUpdate(req.user._id, { email });
    res.send('Profile updated successfully');
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};
