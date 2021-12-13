const mongoose = require("mongoose");
const md5 = require("crypto-js/md5");
const jwt = require("jsonwebtoken");
const Lecture = require("../model/Lecture");
const CourseModule = require("../model/CourseModule");

exports.insertLecture = async (req, res) => {
  const { name, date, url, courseModuleId } = req.body;
  const courseModuleExists = await CourseModule.findById(courseModuleId);
  if (courseModuleExists && courseModuleExists.length === 0) {
    return res
      .status(404)
      .json({ message: "Módulo não encontrado", success: false });
  }
  const newLecture = new Lecture({
    _id: mongoose.Types.ObjectId(),
    name,
    courseModule: courseModuleId,
    date,
    url,
  });
  try {
    newLecture.save();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo deu errado!", success: false });
  }
};
exports.signin = async (req, res) => {
  const { username, password } = req.body;
};
