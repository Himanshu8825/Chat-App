const User = require('../models/UserModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { renameSync, unlinkSync } = require('fs');
const path = require('path');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

const handleErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return handleErrorResponse(res, 400, 'All fields are required');
    }

    if (await User.findOne({ email })) {
      return handleErrorResponse(res, 400, 'User already exists');
    }

    const newUser = new User({
      email,
      password: await bcrypt.hash(password, 10),
    });

    await newUser.save();

    const token = createToken(newUser._id);
    res.cookie('JWT_TOKEN', token, {
      maxAge: maxAge * 1000, // in milliseconds
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    });

    return res
      .status(200)
      .json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    console.error(error.message);
    return handleErrorResponse(res, 500, 'Internal Server Error');
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return handleErrorResponse(res, 400, 'All fields are required');
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return handleErrorResponse(res, 400, 'Invalid email or password');
    }

    const token = createToken(user._id);
    res.cookie('JWT_TOKEN', token, {
      maxAge: maxAge * 1000, // in milliseconds
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    });

    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error.message);
    return handleErrorResponse(res, 500, 'Internal Server Error');
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return handleErrorResponse(res, 404, 'User not found');
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    return handleErrorResponse(res, 500, 'Internal Server Error');
  }
};

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, color } = req.body;

    if (!firstName || !lastName) {
      return handleErrorResponse(res, 400, 'All fields are required');
    }

    const userData = await User.findByIdAndUpdate(
      req.userId,
      {
        firstName,
        lastName,
        color,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ user: userData });
  } catch (error) {
    console.error(error.message);
    return handleErrorResponse(res, 500, 'Internal Server Error');
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    const date = Date.now();
    const originalName = path.parse(req.file.originalname).name;
    const extension = path.parse(req.file.originalname).ext;
    const fileName = `uploads/profiles/${originalName}-${date}${extension}`;
    console.log('fileName : ' + fileName);

    renameSync(req.file.path, fileName);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        image: fileName,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ profileImage: updatedUser.image });
  } catch (error) {
    console.error(error.message);
    return handleErrorResponse(res, 500, 'Internal Server Error');
  }
};

const removeProfileImage = async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.image) {
      const imagePath = user.image;
      unlinkSync(imagePath);
    }

    user.image = null;
    await user.save();

    res.status(200).json({ message: 'Profile image delete successfully' });
  } catch (error) {
    console.error(error.message);
    return handleErrorResponse(res, 500, 'Internal Server Error');
  }
};

const logOutUser = async (req, res) => {
  try {
    res.clearCookie('JWT_TOKEN');
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error.message);
    return handleErrorResponse(res, 500, 'Internal Server Error');
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUserInfo,
  updateProfile,
  uploadProfileImage,
  removeProfileImage,
  logOutUser,
};
