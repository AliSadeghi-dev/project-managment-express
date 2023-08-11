class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      return res.status(200).json({
        status: 200,
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  editProfile(req, res, next) {}
  addSkills(req, res, next) {}
  editSkills(req, res, next) {}
  acceptInviteInTeam(req, res, next) {}
  rejectInviteInTeam(req, res, next) {}
}

module.exports = {
  UserController: new UserController(),
};
