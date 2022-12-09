var path = require("path");
const Fs = require("fs");
const Axios = require("axios");
const Lake = require("./../models/photoModel");

exports.getDataFunction = async () => {
  let res = 0;
  const name = `image-${Date.now()}.jpg`;
  const url = "http://192.168.31.63/capture";
  const pa = path.resolve(__dirname, "./../public/images", name);
  const writer = Fs.createWriteStream(pa);
  try {
    const response = await Axios({
      url,
      method: "GET",
      responseType: "stream",
    });
    await response.data.pipe(writer);

    res = await Axios.get("http://192.168.31.41/capture");
  } catch (err) {
    console.log(err.message);
  }

  const object = {
    name: "lake",
    description: "Lake",
    image: name,
    ph: res.data.ph,
    airQuality: res.data.pollution,
  };
  const logs = await Lake.create(object);
  console.log("respose created");

  console.log(res.data);
  console.log(name);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};
