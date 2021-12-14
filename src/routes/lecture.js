const express = require("express");
const lectureRouter = express.Router();
const lectureController = require("../controllers/lecture");

const userAuth = require("../middlewares/auth");

lectureRouter.get("/get/:id", lectureController.getLecture);
lectureRouter.get("/get", lectureController.getLectures);
lectureRouter.post("/insert", userAuth, lectureController.insertLecture);
lectureRouter.delete("/delete/:id", userAuth, lectureController.deleteLecture);
lectureRouter.patch("/update/:id", userAuth, lectureController.updateLecture);

module.exports = lectureRouter;
