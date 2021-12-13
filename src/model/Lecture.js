const mongoose = require("mongoose");

//lecture
const lectureSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  courseModule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseModule",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Lecture", lectureSchema);
