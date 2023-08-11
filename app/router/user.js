const { UserController } = require("../http/controllers/user.controller");
const { checkLogin } = require("../modules/checkLogin");

const router = require("express").Router();

router.get("/profile",checkLogin, UserController.getProfile);
router.post("/profile", checkLogin, UserController.editProfile);

module.exports = {
  userRoutes: router,
};
