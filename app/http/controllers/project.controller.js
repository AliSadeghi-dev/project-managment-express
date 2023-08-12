const { ProjectModel } = require("../../models/Project");

class ProjectController {
  async createProject(req, res, next) {
    try {
      const owner = req.user._id;
      const { title, text, image, tags } = req.body;
      const result = await ProjectModel.create({
        title,
        text,
        owner,
        image,
        tags,
      });
      if (!result) throw { status: 400, message: "افزودن پروژه انجام نشد.   " };
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllProject(req, res, next) {
    try {
      const owner = req.user._id;
      const projects = await ProjectModel.find({ owner });
      if (!projects)
        throw {
          status: 404,
          message: "این کاربر پروژه ای ثبت نکرده است.",
        };
      return res.status(200).json({
        status: 200,
        success: true,
        projects,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProjectById(req, res, next) {
    try {
      const owner = req.user._id;
      const projectID = req.body.id;
      const project = await ProjectModel.findOne({ owner, _id: projectID });
      if (!project) throw { status: 404, message: "پروژه ای یافت نشد." };
      return res.status(200).json({
        status: 200,
        success: true,
        project,
      });
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
      const projectID = req.body.id;
      const project = await ProjectModel.findOne({
        _id: projectID,
      });
      if (!project) throw { status: 404, message: "پروژه ای یافت نشد." };
      const deleteResult = await ProjectModel.deleteOne({ _id: projectID });
      if (deleteResult.deleteCount == 0)
        throw { status: 404, message: "پروژه حذف نشد." };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "پروژه با موفقیت حذف شد.",
      });
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
}

module.exports = {
  ProjectController: new ProjectController(),
};
