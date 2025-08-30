const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    filename: String,
    data: Buffer,
    contentType: String,
    uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('image', ImageSchema);