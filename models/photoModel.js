const mongoose = require("mongoose");

const LakeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A site must have Name"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Images Should be there"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  ph: {
    type: Number,
    required: [true, "A ph must have Value"],
  },
  airQuality: {
    type: Number,
    required: [true, "A airQuality must have value"],
  },
});

const Lake = mongoose.model("Lake", LakeSchema);
module.exports = Lake;
