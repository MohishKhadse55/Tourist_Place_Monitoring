const Site = require("../models/siteModel");

exports.registerSite = async (req, res, next) => {
  console.log(req.body);
  const logs = await Site.create(req.body);
  res.status(200).json({
    status: "success",
    message: "successfully added the site ",
  });
};
