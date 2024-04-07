const jwt = require("jsonwebtoken");
const { User } = require("../db.js");

const postLoggedUser = async (req, res) => {
  const { mail, password } = req.body;
  try {
    const user = await User.findOne({ where: { mail, password } });
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    const accessToken = jwt.sign({ userId: user.id }, "secret", {
      expiresIn: "1h",
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postLoggedUser;
