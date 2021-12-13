const express = require("express");
const app = express();
const user = require("./user");
const lecture = require("./lecture");
const courseModule = require("./courseModule");

app.use("/", user);
app.use("/lectures", lecture);
app.use("/course-modules", courseModule);

module.exports = app;
