const mongoose = require("mongoose");
const CourseModule = require("../model/CourseModule");

exports.getCourseModule = async (req, res) => {
  const { id } = req.params;
  try {
    const courseModule = await CourseModule.find({ _id: id });
    return res.status(200).json({ courseModule, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo deu errado!", success: false });
  }
};

exports.getCourseModules = async (req, res) => {
  try {
    const courseModules = await CourseModule.find();
    return res.status(200).json({ courseModules, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo deu errado!", success: false });
  }
};

exports.insertCourseModule = async (req, res) => {
  const { name } = req.body;
  const courseModuleExist = await CourseModule.find({ name });
  if (courseModuleExist.length >= 1) {
    return res
      .status(409)
      .json({ message: "Módulo já existe", success: false });
  }
  const newCourseModule = new CourseModule({
    _id: mongoose.Types.ObjectId(),
    name,
  });
  try {
    await newCourseModule.save();
    return res
      .status(201)
      .json({ message: "Módulo criado com sucesso!", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo deu errado!", success: false });
  }
};
exports.deleteCourseModule = async (req, res) => {
  const { id } = req.params;
  try {
    const courseModuleExist = await CourseModule.findById({ _id: id });
    if (courseModuleExist) {
      await courseModuleExist.remove();
      return res.status(200).json({
        message: "Módulo excluído com sucesso",
        success: true,
      });
    }
    return res
      .status(404)
      .json({ message: "Módulo não encontrado", success: false });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo deu errado!", success: false });
  }
};

exports.updateCourseModule = async (req, res) => {
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
    await CourseModule.findOneAndUpdate({ _id: id }, { $set: updateOps });

    return res
      .status(200)
      .json({ message: "Módulo atualizado com sucesso!", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo deu errado!", success: false });
  }
};
