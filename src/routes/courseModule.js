const express = require("express");
const courseModuleRouter = express.Router();
const courseModuleController = require("../controllers/courseModule");


courseModuleRouter.get("/get/:id", courseModuleController.getCourseModule);
courseModuleRouter.get("/get", courseModuleController.getCourseModules);
courseModuleRouter.post("/insert", courseModuleController.insertCourseModule);
courseModuleRouter.delete("/delete/:id", courseModuleController.deleteCourseModule);
courseModuleRouter.patch("/update/:id", courseModuleController.updateCourseModule);

module.exports = courseModuleRouter;
