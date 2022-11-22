const Lake = require("../models/photoModel");
const siteLogs = require("../models/siteLogsModel");
const Site = require("../models/siteModel");
const mongoose = require("mongoose");

// exports.setSiteId = (req, res, next) => {
//   //  Allow the nested Routes
//   if (!req.body.site) req.body.site = req.params.sideId;
//
//   next();
// };

function convertLogsToJson(logs) {
  var temp = logs.map((log) => {
    return {
      image: log.image,
      parameters: JSON.parse(log.parameters),
    };
  });
  console.log("before temp");
  console.log(temp);
  return temp;
}

exports.storeLogs = async (req, res, next) => {
  const object = {
    place: req.params.siteId,
    image: req.file.filename,
    parameters: req.body.parameters,
  };

  const logs = await siteLogs.create(object);

  res.status(201).json({
    status: "success",
    data: logs,
  });
};

exports.getSiteData = async (req, res, next) => {
  // const abc = siteLogs.find({ place: req.params.id });
  // console.log(abc);
  // var _id = mongoose.Types.ObjectId(req.params.id);

  let allSiteName = await Site.find({}).select("siteName");
  console.log(allSiteName);

  let query = Site.findById(req.params.id);
  query = query.populate({ path: "logs" });

  const doc = await query;
  console.log("before doc");
  console.log(doc);
  // console.log(JSON.parse(doc.logs[0].parameters));
  // console.log(doc);
  if (doc !== null) {
    const logs = {
      allSiteName: allSiteName,
      allparameters: doc.allparameters,
      siteName: doc.siteName,
      parameterCount: doc.parameterCount,
      logs: convertLogsToJson(doc.logs),
    };
    console.log(logs);

    res.status(200).render("universal", { logs });
  }
};
