const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');

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

function createUploadPath(){
  const d = new Date();
  const Year = ""+d.getFullYear();
  const Month = ""+d.getMonth();
  const Day = ""+d.getDate();
  const uploadPath =path.join(__dirname,"..","..","public","uploads",Year,Month,Day);
  fs.mkdirSync(uploadPath,{recursive:true});
  return path.join('public','uploads',Year,Month,Day);
}

createUploadPath();

module.exports = {
  HashString,
  tokenGenerator,
  verifyJwtToken,
  createUploadPath,
};
