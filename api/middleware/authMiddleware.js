const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "Not Authenticated" });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(403).json({ msg: "Token is not valid!" });
    }
    req.user = payload;
    next();
  });
};

module.exports = verifyToken;
