const express = require("express");
const lectureRouter = express.Router();
const lectureController = require("../controllers/lecture");

lectureRouter.post("/insert", lectureController.insertLecture);

// userRouter.post("/signin", lectureController.signin);

module.exports = lectureRouter;
