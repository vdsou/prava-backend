const mongoose = require("mongoose");

// module
const courseModuleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  lecturesQuantity: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("CourseModule", courseModuleSchema);
