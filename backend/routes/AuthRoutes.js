const express = require('express');
const {
  signupUser,
  loginUser,
  getUserInfo,
  updateProfile,
  uploadProfileImage,
  removeProfileImage,
  logOutUser,
} = require('../controllers/AuthController');
const verifyToken = require('../middlewares/AuthMiddleware');
const multer = require('multer');

const userRouter = express.Router();

const upload = multer({ dest: 'uploads/profiles/' });

userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);
userRouter.get('/user-info', verifyToken, getUserInfo);
userRouter.post('/update-profile', verifyToken, updateProfile);
userRouter.post(
  '/add-profileImage',
  verifyToken,
  upload.single('profile-image'),
  uploadProfileImage
);
userRouter.delete('/remove-profileImage', verifyToken, removeProfileImage);
userRouter.post('/logout', logOutUser);

module.exports = userRouter;
