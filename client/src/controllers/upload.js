const Upload = require('../models/upload');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const jwt = require('jsonwebtoken');
const request = require('request');
module.exports = {
    uploadImg: (req, res) => {
        const { title, url } = req.body
        userId = req.currentUser.user_id;
        // console.log("i am from upload.js in node controller " + req.currentUser.user_id)
        const upload = new Upload({
            _id: new mongoose.Types.ObjectId,
            userId: userId,
            date: new Date().toISOString().slice(0, 10),
            title: title,
            url: url
        });
        // console.log(upload + "upload")
        upload.save().then((upload) => {
            return res.status(200).json({ message: 'the upload saved succeesfull' })
        }).catch(error => { return res.status(500).json({ error }) })
    },
    getMyUploads: (req, res) => {
        userId = req.currentUser.user_id;
        Upload.find({ userId }).then((uploads) => {
            // console.log("fffffff" + apiHistory.length + "apiHistory")
            res.status(200).json({ uploads })
        }).catch(error => { res.status(500).json({ error }) })
    },
}
