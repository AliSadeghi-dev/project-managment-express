const { UserController } = require("../http/controllers/user.controller");
const { checkLogin } = require("../modules/checkLogin");

const router = require("express").Router();

router.get("/profile",checkLogin, UserController.getProfile);

module.exports = {
  userRoutes: router,
};
