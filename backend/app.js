require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/AuthRoutes');

//! Initialize Express app
const app = express();

//! Use middlewares
app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
);
app.use('/uploads/profiles' , express.static("/uploads/profiles"))
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth' , userRouter);

//! Environment variables for port and MongoDB URI
const port = process.env.PORT;
const mongoDb = process.env.MONGODB_URI;

//! Connect to MongoDB
mongoose
  .connect(mongoDb)
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

//! Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
