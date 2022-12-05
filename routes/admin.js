var express = require("express");
var router = express.Router();
const adminController = require("../Controllers/adminController");
const authController = require("../Controllers/authController");

/* GET users listing. */

router.get("/", adminController.getAdminPanel);
router.post("/registerSite", adminController.registerSite);
router.get("/getSignupForm", authController.getSignupForm);
router.post("/signup", authController.signup);
router.get("/getRegistrationForm", function (req, res, next) {
  console.log(req.body);
  res.render("register");
});

module.exports = router;
