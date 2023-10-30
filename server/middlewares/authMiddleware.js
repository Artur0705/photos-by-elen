const jwt = require("jsonwebtoken");
let blacklistedTokens = [];

exports.verifyToken = (req, res, next) => {
  const authHeader = req.header("authorization");
  if (!authHeader)
    return res.status(401).send("Access denied. No token provided.");

  const token = authHeader.split(" ")[1]; // Split by space to get the token part
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.admin = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

exports.blacklistToken = (token) => {
  blacklistedTokens.push(token);
};
