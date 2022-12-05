var express = require("express");
var router = express.Router();
const authController = require("../Controllers/authController");
/* GET users listing. */

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
