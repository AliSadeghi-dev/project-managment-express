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

function verifyJwtToken (token){
  const result = jwt.verify(token, process.env.JWT_SECRET);
  if (!result?.username) throw {status: 401, message:"لطفا وارد حساب کاربری خود شوید."}
  return result;
}

module.exports = {
  HashString,
  tokenGenerator,
  verifyJwtToken,
};
