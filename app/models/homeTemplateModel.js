"use strict";

var mongoose = require("mongoose");

try {
  var mongoConnect = require("/etc/coutloot/mongo/mongoConnect");
} catch (e) {
  if (!mongoConnect) {
    console.log("Mongo connection error");
    process.exit(0);
  }
}

var dbCreds = {
  userName: "mahendra",
  userSecret: "test",
  database: "utils",
  access: "readWrite",
  applicationId: "t001",
};

var connectionObject = mongoConnect.getConnection(
  dbCreds.userName,
  dbCreds.userSecret,
  dbCreds.database,
  dbCreds.access,
  dbCreds.applicationId,
  mongoose
);
var connection = connectionObject.connection;

var homeTemplatesSchema = mongoose.Schema({}, { strict: false });

module.exports = connection.model("homeTemplates", homeTemplatesSchema, "homeTemplates");
