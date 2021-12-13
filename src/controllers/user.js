const mongoose = require("mongoose");
const md5 = require("crypto-js/md5");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const secretKey = process.env.TOKEN_SECRET_KEY;

exports.signup = async (req, res) => {
  const { fullName, username, password } = req.body;
  const userExists = await User.find({ username });
  if (userExists.length >= 1) {
    return res.status(409).json({
      message: "Usuário já existe!",
      success: false,
    });
  }
  try {
    const newUser = new User({
      _id: mongoose.Types.ObjectId(),
      fullName,
      username,
      password: md5(password).toString(),
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
exports.signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Usuário ou senha errados!", success: false });
    }
    if (md5(password).toString() === user.password) {
      const token = jwt.sign(
        {
          id: user._id,
          fullName: user.fullName,
          username: user.username,
        },
        secretKey,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ userToken: token, success: true });
    }
    return res
      .status(401)
      .json({ message: "Usuário ou senha errados", success: false });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo deu errado!", success: false });
  }
};
