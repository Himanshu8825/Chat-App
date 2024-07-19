const User = require('../models/UserModel');

const searchContact = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    if (!searchTerm) {
      return res.status(400).json({ message: 'SearchTerm is required' });
    }

    const sanitizeSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&'
    );

    const regex = new RegExp(sanitizeSearchTerm, 'i');
    const contacts = await User.find({
      $and: [
        {
          _id: { $ne: req.userId },
        },
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        },
      ],
    });

    return res.status(200).json({ contacts });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { searchContact };
