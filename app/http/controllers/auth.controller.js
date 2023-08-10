const { UserModel } = require("../../models/User");
const { HashString } = require("../../modules/functions");

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
  login() {}
  resetPassword() {}
}

module.exports = {
  AuthController: new AuthController(),
};
