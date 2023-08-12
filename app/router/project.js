const fileUpload = require("express-fileupload");
const { ProjectController } = require("../http/controllers/project.controller");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { createProjectValidator } = require("../http/validations/project");
const { checkLogin } = require("../modules/checkLogin");
const { uploadFile } = require("../modules/express-fileUploader");
const { mongoIdValidator } = require("../modules/public");

const router = require("express").Router();

router.post(
  "/create",
  fileUpload(),
  checkLogin,
  uploadFile,
  createProjectValidator(),
  expressValidatorMapper,
  ProjectController.createProject
);

router.get("/all", checkLogin, ProjectController.getAllProject);
router.get("/getone", checkLogin, ProjectController.getProjectById);
router.delete("/delete", checkLogin,mongoIdValidator(), ProjectController.removeProject);
router.patch("/update", checkLogin,mongoIdValidator(), ProjectController.updateProject);

module.exports = {
  projectRoutes: router,
};
