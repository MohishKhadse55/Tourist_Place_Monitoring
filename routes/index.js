var express = require("express");
var router = express.Router();

const imageController = require("./../Controllers/imageController");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("Home", { title: "Express" });
// });

router.post(
  "/upload",
  imageController.uploadUserPhoto,
  imageController.storeLogs
);
router.get("/getImages/:count", imageController.getLogs);

module.exports = router;
