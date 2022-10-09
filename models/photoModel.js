const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({
        name: String,
        desc: String,
        img:
            {
                data: Buffer,
                contentType: String
            }
    })

const Images= mongoose.model('Image', imageSchema);
module.exports = Images;
