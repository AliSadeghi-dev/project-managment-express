const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
      default: "/defaults/project-management-header.png",
    },
    private: {
      type: Boolean,
      default: true,
    },
    team: {
      type: mongoose.Types.ObjectId,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = {
  ProjectModel,
};
