var express = require("express");
var router = express.Router();
var logsController = require("./../Controllers/logsController");
const authController = require("../Controllers/authController");
const imageController = require("./../Controllers/imageController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get(
  "/getSiteData/:id",
  authController.isLoggedIn,
  logsController.getSiteData
);

router.post(
  "/updateLogs/:siteId",
  imageController.uploadUserPhoto,
  logsController.storeLogs
);

router.get("/getImages/:count", imageController.getLogs);

router.post(
  "/upload",
  imageController.uploadUserPhoto,
  imageController.storeLogs
);

module.exports = router;
