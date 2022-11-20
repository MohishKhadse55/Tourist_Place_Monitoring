const Lake = require("../models/photoModel");
const siteLogs = require("../models/siteLogsModel");
const Site = require("../models/siteModel");

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
  const abc = siteLogs.find({ place: req.params.id });
  // console.log(abc);
  let query = Site.findById(req.params.id);
  query = query.populate({ path: "logs", fields: "image parameters" });

  const doc = await query;
  // console.log(JSON.parse(doc.logs[0].parameters));
  // console.log(doc);

  const logs = {
    allparameters: doc.allparameters,
    siteName: doc.siteName,
    parameterCount: doc.parameterCount,
    logs: convertLogsToJson(doc.logs),
  };
  console.log(logs);

  res.render("universal", { logs });
};
