const express = require("express");
const lectureRouter = express.Router();
const lectureController = require("../controllers/lecture");

lectureRouter.get("/get/:id", lectureController.getLecture);
lectureRouter.get("/get", lectureController.getLectures);
lectureRouter.post("/insert", lectureController.insertLecture);
lectureRouter.delete("/delete/:id", lectureController.deleteLecture);
lectureRouter.patch("/update/:id", lectureController.updateLecture);

module.exports = lectureRouter;
