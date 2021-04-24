const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type:String },
    date: { type: Date, },//???
    explanation: { type: String },
    media_type: { type: String },
    service_version: { type: String },
    title: { type: String },
    url: { type: String }
})
module.exports = mongoose.model('Picture', pictureSchema);

