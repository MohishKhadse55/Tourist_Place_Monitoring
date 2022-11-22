var createError = require("http-errors");
var express = require("express");
var path = require("path");
// const Axios = require("axios");
// const Fs = require("fs");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminPanelRouter = require("./routes/admin");

// Images
// var fs = require("fs");

var app = express();

const getData = require("./Utilities/downloadImage");

// Data Fetching Function

// async function downloadImage() {
//   let res = 0;
//   const name = `image-${Date.now()}.jpg`;
//   const url = "http://192.168.1.15/capture";
//   const pa = path.resolve(__dirname, "public/images", name);
//   const writer = Fs.createWriteStream(pa);
//
//   const response = await Axios({
//     url,
//     method: "GET",
//     responseType: "stream",
//   });
//   await response.data.pipe(writer);
//
//   res = await Axios.get("http://192.168.1.2/capture");
//
//   const object = {
//     name: "lake",
//     description: "Lake",
//     image: name,
//     ph: res.data.ph,
//     airQuality: res.data.pollution,
//   };
//   const logs = await Lake.create(object);
//
//   console.log(res.data);
//   console.log(name);
//
//   return new Promise((resolve, reject) => {
//     writer.on("finish", resolve);
//     writer.on("error", reject);
//   });
// }
// Database config
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const Lake = require("./models/photoModel");
dotenv.config({ path: "./config.env" });
const dba = process.env.DATABASE;

const DB = dba.replace("<password>", process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // setInterval(getData.getDataFunction, 5000);
    console.log("Databases connection established");
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use("/adminpanel", adminPanelRouter);
app.use("/users", usersRouter);

// function getDataFrom() {
//   console.log("data got");
// }

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
