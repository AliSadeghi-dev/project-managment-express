const { UserModel } = require("../../models/User");

class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      user.profile_image =
        req.protocol +
        "://" +
        req.get("host") +
        "/" +
        user.profile_image.replace(/[\\\\]/gm, "/");
      return res.status(200).json({
        status: 200,
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async editProfile(req, res, next) {
    try {
      const data = req.body;
      const userId = req.user._id;
      const filed = ["first_name", "last_name", "skills"];
      const badValues = ["", " ", undefined, null, NaN, 0, -1];
      Object.entries(data).forEach(([key, value]) => {
        if (!filed.includes(key)) delete data[key];
        if (badValues.includes(value)) delete data[key];
      });
      const user = await UserModel.updateOne({ _id: userId }, { $set: data });
      if (user.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "بروزرسانی پروفایل با موفقیت انجام شد.",
        });
      }
      throw { status: 400, message: "بروز رسانی انجام نشد." };
    } catch (error) {
      next(error);
    }
  }

  async uploadProfileImage(req, res, next) {
    try {
      const userID = req.user._id;
      if (Object.keys(req.file).length == 0)
        throw { status: 400, message: "لطفا تصویری را انتخاب کنید." };
      const filePath = req.file?.path.substring(7);
      const result = await UserModel.updateOne(
        { _id: userID },
        { $set: { profile_image: filePath } }
      );
      if (result.modifiedCount == 0)
        throw { status: 400, message: "بروزرسانی انجام نشد" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "بروزرسانی عکس پروفایل با موفقیت انجام شد.",
      });
    } catch (error) {
      next(error);
    }
  }
  addSkills(req, res, next) {}
  editSkills(req, res, next) {}
  acceptInviteInTeam(req, res, next) {}
  rejectInviteInTeam(req, res, next) {}
}

module.exports = {
  UserController: new UserController(),
};
