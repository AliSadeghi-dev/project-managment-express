const { ProjectModel } = require("../../models/Project");

class ProjectController {
  async createProject(req, res, next) {
    try {
      const owner = req.user._id;
      const { title, text,image,tags } = req.body;
      const result = await ProjectModel.create({
        title,
        text,
        owner,
        image,
        tags
      });
      if (!result) throw { status: 400, message: "افزودن پروژه انجام نشد.   " };
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllProject(req, res, next) {
    const owner = req.user._id;
    const projects = await ProjectModel.find({ owner });
    if(!projects) throw {status: 404, message:"این کاربر پروژه ای ثبت نکرده است."}
    return res.status(200).json({
        status:200,
        success:true,
        projects
    })
    try {
    } catch (error) {
      next(error);
    }
  }

  async getProjectById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getProjectOfTeam(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getProjectOfUser(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async updateProject(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async removeProject(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  ProjectController: new ProjectController(),
};
