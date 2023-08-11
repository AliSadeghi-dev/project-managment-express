const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function HashString(str) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
}

function tokenGenerator(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "356 days",
  });
  return token;
}

module.exports = {
  HashString,
  tokenGenerator,
};
