const jwt = require("jsonwebtoken");
const secretKey = process.env.TOKEN_SECRET_KEY;

module.exports = userAuth = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(" ");
    const decoded = await jwt.verify(token, secretKey);
    req.userData = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Não autorizado", success: false });
  }
};
