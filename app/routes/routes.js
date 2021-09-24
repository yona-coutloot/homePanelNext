"use strict";
const {
  allTemplates,
  addNewTemplate,
  getTemplate,
  deleteTemplate,
  cloneTemplate,
} = require("../controllers/homePanelController");
const { authenticateUser } = require("../middleware/auth");

module.exports = (app) => {
  app.route("/homePanelApi/template/allTemplates").post(authenticateUser, allTemplates);
  app.route("/homePanelApi/template/addNewTemplate").post(authenticateUser, addNewTemplate);
  app.route("/homePanelApi/template/getTemplate").post(authenticateUser, getTemplate);
  app.route("/homePanelApi/template/deleteTemplate").post(authenticateUser, deleteTemplate);
  app.route("/homePanelApi/template/cloneTemplate").post(authenticateUser, cloneTemplate);
};
