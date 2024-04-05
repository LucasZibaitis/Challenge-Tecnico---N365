const { User } = require("../db.js");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).send(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllUsers;
