var express = require("express");
var router = express.Router();
const adminController = require("../Controllers/adminController");

/* GET users listing. */
router.post("/", adminController.registerSite);

router.get("/getRegistrationForm", function (req, res, next) {
  console.log(req.body);
  res.render("register");
});

module.exports = router;
