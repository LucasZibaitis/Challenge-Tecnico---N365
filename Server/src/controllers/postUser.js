const { User } = require("../db.js");

const postUser = async (req, res) => {
  const { name, lastName, mail, password } = req.body;
  try {
    const newUser = await User.create({
      name: name,
      lastName: lastName,
      mail: mail,
      password: password,
    });
    return res.status(200).send(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postUser;
