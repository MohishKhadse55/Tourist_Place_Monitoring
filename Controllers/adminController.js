const Site = require("../models/siteModel");

exports.registerSite = async (req, res, next) => {
  console.log(req.body);
  // console.log(JSON.parse(JSON.stringify(req.body)));
  const logs = await Site.create(req.body);
  res.status(200).json({
    status: "success",
    message: "successfully added the site ",
  });
};

exports.getAdminPanel = async (req, res, next) => {
  res.status(200).render("adminPanel", { title: "Admin Panel" });
};
