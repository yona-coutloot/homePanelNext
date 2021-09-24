const homeTemplateModel = require("../models/homeTemplateModel");
const { responseSend } = require("../helpers/responseSend");

//? HOME TEMPLATE BASIC CRUD METHODS
exports.getTemplate = async (filter, select, sort, skip, limit) => {
  try {
    return await homeTemplateModel
      .find(filter)
      .read("secondaryPreferred")
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(); //.read("secondaryPreferred")
  } catch (error) {
    console.log("🚀 ~ file: homePanelServices.js ~ line 15 ~ exports.getAllTemplates ~ error", error);
  }
};

exports.createTemplate = async (addData) => {
  try {
    const newTemplate = new homeTemplateModel(addData);
    return await newTemplate.save();
  } catch (error) {
    console.log("🚀 ~ file: homePanelServices.js ~ line 24 ~ exports.createTemplate ~ error", error);
  }
};

exports.deleteTemplate = async (deleteFilter) => {
  try {
    return await homeTemplateModel.deleteOne(deleteFilter);
  } catch (error) {
    console.log("🚀 ~ file: homePanelServices.js ~ line 33 ~ exports.deleteTemplate ~ error", error);
  }
};
