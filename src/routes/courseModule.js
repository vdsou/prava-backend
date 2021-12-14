const express = require("express");
const courseModuleRouter = express.Router();
const courseModuleController = require("../controllers/courseModule");
const userAuth = require("../middlewares/auth")

courseModuleRouter.get("/get/:id", courseModuleController.getCourseModule);
courseModuleRouter.get("/get", courseModuleController.getCourseModules);
courseModuleRouter.post("/insert", userAuth, courseModuleController.insertCourseModule);
courseModuleRouter.delete("/delete/:id", userAuth, courseModuleController.deleteCourseModule);
courseModuleRouter.patch("/update/:id", userAuth, courseModuleController.updateCourseModule);

module.exports = courseModuleRouter;
