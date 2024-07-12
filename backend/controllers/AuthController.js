const User = require('../models/UserModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email,
      password: hashPassword,
    });

    await newUser.save();

    res.cookie('JWT_TOKEN', createToken(newUser._id), {
      maxAge: maxAge,
      secure: true,
      sameSite: 'None',
    });

    return res
      .status(200)
      .json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatchedPassword = await bcrypt.compare(password, user.password);

    if (!isMatchedPassword) {
      return res.status(400).json({ message: 'Invalid Password' });
    }

    const token = createToken(user._id);

    res.cookie('JWT_TOKEN', token, {
      maxAge: maxAge,
      secure: true,
      sameSite: 'None',
    });

    return res
      .status(200)
      .json({ message: 'Login successful', token: token, user: user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user: user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


//!Exporting Controllers
module.exports = { signupUser, loginUser, getUserInfo };
