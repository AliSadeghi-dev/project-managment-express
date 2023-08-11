const { UserModel } = require("../models/User");
const { verifyJwtToken } = require("./functions");

const checkLogin = async(req, res, next) => {
  try {
    const authorization = req.headers?.authorization;
    // console.log(authorization);
    const token = authorization?.split(" ")[1];
    const authError = {
      status: 401,
      message: "لطفا وارد حساب کاربری خود شوید.",
    };
    if (!token) throw authError;
    const result = verifyJwtToken(token);
    const { username } = result;
    if (!username) throw authError;
    const user = await UserModel.findOne({ username });
    if (!user) throw authError;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkLogin,
};
