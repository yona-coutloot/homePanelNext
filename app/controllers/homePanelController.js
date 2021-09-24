"use strict";
const { responseSend } = require("../helpers/responseSend");
const { getTemplate, createTemplate, deleteTemplate } = require("../services/homePanelServices");

exports.allTemplates = async (req, res) => {
  try {
    let { pageNo } = req.body; //? For Pagination
    pageNo = Number(pageNo);

    if (!pageNo && pageNo !== 0) throw new Error("PageNo. is required");

    const filter = { templateId: { $exists: true } }; //? get templates having templateId property

    const select = { popup: 0, template: 0 }; //? get All fields except popup & template array.
    //? Skip & limit for Pagination
    const limit = 20;
    const skip = pageNo * limit;

    const allTemplateData = await getTemplate(filter, select, { _id: -1 }, skip, limit);

    //? Sort the Data from New to Old
    allTemplateData.sort((a, b) => {
      return b.templateId - a.templateId;
    });

    responseSend(res, 200, 1, "All Templates Fetched SuccessFully", allTemplateData);
  } catch (e) {
    return responseSend(res, 400, 0, e.message, []);
  }
};

exports.addNewTemplate = async (req, res) => {
  try {
    const { templateName } = req.body;

    const templateToBeCreated = {
      templateId: Date.now(),
      templateName,
      status: 0,
      popup: [],
      template: [],
      generalDetails: {
        createdBy: req.loggedInUser.name,
        createdAt: parseInt(Date.now() / 1000),
        logs: [],
      },
    };

    const newTemplate = await createTemplate(templateToBeCreated);

    if (!newTemplate) throw new Error("Some Error Occurred While creating Adding the new Template");

    responseSend(res, 201, 1, "Template Created Successfully", newTemplate);
  } catch (e) {
    return responseSend(res, 400, 0, e.message, []);
  }
};

exports.getTemplate = async (req, res) => {
  try {
    let { templateId } = req.body;
    templateId = Number(templateId);

    if (!templateId) throw new Error("TemplateId is Required");

    const select = { popup: 1, templateId: 1, template: 1 };

    let templateData = await getTemplate({ templateId }, select, {}, 0, 0);

    if (templateData.length === 0) throw new Error("Template Not Found, Please Check Template Id");

    templateData = templateData[0];

    return responseSend(res, 200, 1, "Template Found", templateData);
  } catch (e) {
    return responseSend(res, 400, 0, e.message, []);
  }
};

exports.deleteTemplate = async (req, res) => {
  try {
    let { templateId } = req.body;
    templateId = Number(templateId);

    if (!templateId) throw new Error("TemplateId is Required");

    const deletedTemplate = await deleteTemplate({ templateId });

    if (deletedTemplate.n === 0 && deletedTemplate.deletedCount === 0)
      throw new Error("Template Already Deleted, Please check template Id");

    responseSend(res, 200, 1, "Template Deleted Successfully", deleteTemplate);
  } catch (e) {
    return responseSend(res, 400, 0, e.message, []);
  }
};

exports.cloneTemplate = async (req, res) => {
  try {
    let { templateId, templateName } = req.body;
    templateId = Number(templateId);

    if (!templateId) throw new Error("Template Id Required");

    if (!templateName) throw new Error("Template Name Required");

    //? Properties required for cloning to new template
    const select = { popup: 1, template: 1, status: 1 };

    let templateToBeCloned = await getTemplate({ templateId }, select, {}, 0, 0);

    if (templateToBeCloned.length === 0) throw new Error("Template Not Found, Please Check Template Id");

    templateToBeCloned = templateToBeCloned[0];

    const { status, template, popup } = templateToBeCloned;

    //? New cloned Template to be Created from the old template
    const templateToBeCreated = {
      templateId: Date.now(),
      templateName,
      status,
      popup,
      template,
      generalDetails: {
        createdBy: req.loggedInUser.name,
        createdAt: parseInt(Date.now() / 1000),
        logs: [],
      },
    };

    const newTemplate = await createTemplate(templateToBeCreated);

    if (!newTemplate) throw new Error("Some Error Occurred While creating Adding the new Template");

    responseSend(res, 201, 1, "Template Created Successfully", newTemplate);
  } catch (e) {
    return responseSend(res, 400, 0, e.message, []);
  }
};
