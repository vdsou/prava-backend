require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const connectDB = require("./data/database");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(routes);
app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
