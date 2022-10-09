var fs = require('fs');
var multer = require('multer');
const Images =require('./../models/photoModel')
var path = require('path');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        console.log(file)
        console.log(req.file)
        const ext = file.mimetype.split('/')[1]
        cb(null, `${file.fieldname + '-' + Date.now()}.${ext}`)
    }
});

var upload = multer({ storage: storage });

exports.uploadUserPhoto = upload.single('image');


exports.uploadHandler = (req,res,next)=>{
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(`./uploads/${req.file.filename}` ),
            contentType: 'image/jpg'
        }
    }

    Images.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            console.log("item saved")
        }
    });
}