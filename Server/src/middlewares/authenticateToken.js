const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ error: "Acceso denegado" });
  }

  jwt.verify(accessToken, "secret", (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Acceso denegado" });
    }
    next();
  });
}

module.exports = authenticateToken;
