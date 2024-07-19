const express = require('express');
const verifyToken = require('../middlewares/AuthMiddleware.js');
const { searchContact } = require('../controllers/ContactsController.js');

const contactsRouter = express.Router();

contactsRouter.post('/search', verifyToken, searchContact);

module.exports = contactsRouter;
