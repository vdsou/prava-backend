const mongoose = require("mongoose");
const User = require("../model/user");

exports.signup = async (req, res) => {
  const { fullName, username, password } = req.body;
  const hasUser = await User.find({ username });
  if (hasUser.length >= 1) {
    res.status(409).json({
      message: "Usuário já existe!",
      success: false,
    });
  }
  try {
    const newUser = new User({
      _id: mongoose.Types.ObjectId(),
      fullName,
      username,
      password,
    });
    await newUser.save();
    return res.status(201).json({
      message: "Usuário criado com sucesso!",
      success: true,
    });
  } catch {
    return res.status(400).json({
      message: "Algo deu errado!",
      success: false,
    });
  }
};
