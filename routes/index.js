var express = require('express');
var router = express.Router();

const imageController = require('./../Controllers/imageController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload',imageController.uploadUserPhoto,imageController.uploadHandler)

module.exports = router;
