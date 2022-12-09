var express = require("express");
var router = express.Router();
var logsController = require("./../Controllers/logsController");
const authController = require("../Controllers/authController");
const imageController = require("./../Controllers/imageController");

/* GET home page. */
router.get("/", authController.getLoginForm);

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

router.get(
  "/getImages/:count",
  authController.isLoggedIn,
  imageController.getLogs
);

router.post(
  "/upload",
  imageController.uploadUserPhoto,
  imageController.storeLogs
);

module.exports = router;
