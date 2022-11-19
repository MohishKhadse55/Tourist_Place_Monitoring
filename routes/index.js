var express = require("express");
var router = express.Router();

const imageController = require("./../Controllers/imageController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/getImages/:count", imageController.getLogs);

router.post(
  "/upload",
  imageController.uploadUserPhoto,
  imageController.storeLogs
);

module.exports = router;
