const express = require("express");
const app = express();
const user = require("./user");

app.use("/", user);
// app.use("/signin");
// app.use("/lecture");
// app.use("/course-module");

module.exports = app;
