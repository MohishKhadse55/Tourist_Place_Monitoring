const mongoose = require("mongoose");

const siteLogsSchema = new mongoose.Schema({
  place: {
    type: mongoose.Schema.ObjectId,
    ref: "Sites",
  },
  image: {
    type: String,
    required: [true, "Images Should be there"],
  },
  parameters: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const siteLogs = mongoose.model("siteLogs", siteLogsSchema);
module.exports = siteLogs;
