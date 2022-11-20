const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: [true, "A site must have Name"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  parameterCount: {
    type: Number,
    required: [true, "Images Should be there"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  allparameters: [{ type: String }],
  logs: {
    ref: "siteLogs",
    foreignField: "place", // tour field is called the tour in the review model and here it will be called the _id
    localField: "_id",
  },
});

const Site = mongoose.model("Sites", siteSchema);
module.exports = Site;
