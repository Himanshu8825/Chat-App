const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.JWT_TOKEN;
  if (!token) {
    return res.status(401).json({ message: 'You are not Authenticated' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    req.userId = payload._id;
    next();
  });
};

module.exports = verifyToken;
