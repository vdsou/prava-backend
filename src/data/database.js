const mongoose = require("mongoose");

const connectionDriver = process.env.CONNECTION_DRIVER;

const connectDataBase = () => {
  mongoose.connect(connectionDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const database = mongoose.connection;
  database.on("error", (error) => console.log(error));
  database.once("open", () => console.log("Connect to the database!"));
};

module.exports = connectDataBase;
