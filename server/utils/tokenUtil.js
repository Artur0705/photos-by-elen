const jwt = require("jsonwebtoken");

exports.generateToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};
