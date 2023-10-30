const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/tokenUtil");
const { blacklistToken } = require("../middlewares/authMiddleware");

require("dotenv").config();

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (username !== process.env.ADMIN_USERNAME) {
    return res.status(401).send("Access denied. Invalid username.");
  }

  const validPassword = await bcrypt.compare(
    password,
    await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
  );
  if (!validPassword) {
    return res.status(401).send("Access denied. Invalid password.");
  }

  const token = generateToken(username);
  res.send({ message: "Logged in successfully.", token, username });
};

exports.logout = (req, res) => {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res.status(401).send("Access denied. No token provided.");

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access denied. No token provided.");

  blacklistToken(token);

  res.send("Logged out successfully.");
};
