const express = require('express');
const {
  signupUser,
  loginUser,
  getUserInfo,
} = require('../controllers/AuthController');
const verifyToken = require('../middlewares/AuthMiddleware');

const userRouter = express.Router();

userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);
userRouter.get('/user-info', verifyToken, getUserInfo);

module.exports = userRouter;
