var fs = require("fs");
var multer = require("multer");
const Lake = require("./../models/photoModel");
var path = require("path");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    // console.log(req.file);
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname + "-" + Date.now()}.${ext}`);
  },
});

var upload = multer({ storage: storage });

exports.uploadUserPhoto = upload.single("image");

// Upload handler
exports.uploadHandler = (req, res, next) => {
  var obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(`./public/images/${req.file.filename}`),
      contentType: "image/jpg",
    },
  };

  Images.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      console.log("item saved");
    }
  });
};

exports.storeLogs = async (req, res, next) => {
  const object = {
    name: req.body.name,
    description: req.body.description,
    image: req.file.filename,
    ph: req.body.ph,
    airQuality: req.body.airQuality,
  };

  const logs = await Lake.create(object);

  res.status(201).json({
    status: "success",
    data: logs,
  });
};

exports.getLogs = async (req, res, next) => {
  console.log(req.params.count);
  const logs = await Lake.find()
    .sort({ _id: -1 })
    .limit(+req.params.count);
  console.log(logs);
  res.render("Home", { logs });
};
