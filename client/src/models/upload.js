const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: String },
    date: { type: Date, },//???
    title: { type: String },
    url: { type: String }
})
module.exports = mongoose.model('Upload', uploadSchema);