const { UserModel } = require("../../models/User");
const { HashString, tokenGenerator } = require("../../modules/functions");
const bcrypt = require("bcrypt");
class AuthController {
  async register(req, res, next) {
    try {
      const { username, password, email, mobile } = req.body;
      const hash_password = HashString(password);
      const user = await UserModel.create({
        username,
        email,
        mobile,
        password: hash_password,
      }).catch((err) => {
        if (err?.code === 11000) {
          throw {
            status: 400,
            message: "نام کاربری قبلا در سیستم اضافه شده است",
          };
        }
      });
      user.password = undefined;
      return res.json({ user });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (!user) {
        res.status(401).json({ message: "نام کاربری یا رمز عبور اشتباه است." });
      }
      const compareResult = bcrypt.compareSync(password, user.password);
      if (!compareResult) {
        res.status(401).json({ message: "نام کاربری یا رمز عبور اشتباه است." });
      }
      const token = tokenGenerator({ username });
      user.token = token;
      await user.save();
      return res.status(200).json({
        status: 200,
        success: true,
        message: "شما با موفقیت احراز شدید.",
        token,
      });
    } catch (error) {
      next(error);
    }
  }
  resetPassword() {}
}

module.exports = {
  AuthController: new AuthController(),
};
