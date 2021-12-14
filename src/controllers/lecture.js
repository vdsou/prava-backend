const mongoose = require("mongoose");
const Lecture = require("../model/Lecture");
const CourseModule = require("../model/CourseModule");

exports.getLecture = async (req, res) => {
  const { id } = req.params;
  try {
    const lecture = await Lecture.find({ _id: id });
    return res.status(200).json({ lecture, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Aula não encontrada!", success: false });
  }
};

exports.getLectures = async (req, res) => {
  try {
    const lecture = await Lecture.find().populate("courseModule", "_id name");
    return res.status(200).json({ lecture, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Aulas não encontradas!", success: false });
  }
};

exports.insertLecture = async (req, res) => {
  const { name, date, url, courseModuleId } = req.body;
  try {
    const courseModuleExists = await CourseModule.findById(courseModuleId);
    if (!courseModuleExists) {
      return res
        .status(404)
        .json({ message: "Módulo não encontrado", success: false });
    }
    const lecture = await Lecture.find({ name });
    if (lecture.length >= 1) {
      return res
        .status(409)
        .json({ message: "Nome de aula já existe!", success: false });
    }
    const newLecture = new Lecture({
      _id: mongoose.Types.ObjectId(),
      name,
      courseModule: courseModuleId,
      date,
      url,
    });
    await newLecture.save();
    return res
      .status(201)
      .json({ message: "Aula criada com sucesso!", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo deu errado!", success: false });
  }
};

exports.updateLecture = async (req, res) => {
  const { id } = req.params;
  const updateOps = {};
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      const element = req.body[key];
      updateOps[key] = element;
    }
  }
  if (Object.keys(updateOps).length === 0) {
    return res.status(400).json({ message: "Nada para atualizar" });
  }
  try {
    await Lecture.findOneAndUpdate({ _id: id }, { $set: updateOps });

    return res
      .status(200)
      .json({ message: "Aula atualizada com sucesso!", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo deu errado!", success: false });
  }
};

exports.deleteLecture = async (req, res) => {
  const { id } = req.params;
  try {
    const lectureExists = await Lecture.findById({ _id: id });
    if (lectureExists) {
      await lectureExists.remove();
      return res.status(200).json({
        message: "Aula excluída com sucesso",
        success: true,
      });
    }
    return res
      .status(404)
      .json({ message: "Aula não encontrada", success: false });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo deu errado!", success: false });
  }
};
