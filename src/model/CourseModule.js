const mongoose = require("mongoose");

// module
const courseModuleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CourseModule", courseModuleSchema);
