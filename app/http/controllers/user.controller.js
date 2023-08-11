const { UserModel } = require("../../models/User");

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
  async editProfile(req, res, next) {
    try {
        const data = req.body;
        const userId = req.user._id;
        const filed = ["first_name", "last_name", "skills"];
        const badValues = ['',' ',undefined,null,NaN,0,-1]
        Object.entries(data).forEach(([key, value]) =>{
            if (!filed.includes(key)) delete data[key];
            if (badValues.includes(value)) delete data[key];
        })
        const user = await UserModel.updateOne({_id:userId},{$set:data});
        if(user.modifiedCount > 0){
            return res.status(200).json({
                status:200,
                success:true,
                message:'بروزرسانی پروفایل با موفقیت انجام شد.'
            })
        }
        throw {status:400,message:'بروز رسانی انجام نشد.'}
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
