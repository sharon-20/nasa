const Picture = require('../models/picture');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const jwt = require('jsonwebtoken');
const request = require('request');
module.exports = {
    getApod: (req, res) => {
        userId = req.currentUser.user_id;
        // console.log("i am from picture.js in node controller " + req.currentUser.user_id)
        requestApi().then(data => {
            const pictureApi = JSON.parse(data);
            const picture = new Picture({
                _id: new mongoose.Types.ObjectId,
                userId: userId,
                date: pictureApi.date,
                explanation: pictureApi.explanation,
                media_type: pictureApi.media_type,
                service_version: pictureApi.service_version,
                title: pictureApi.title,
                url: pictureApi.url
            });
            picture.save().then((picture) => {
                return res.status(200).send({pictureApi})
            }).catch(error => { return res.status(500).json({ error }) })
        }).catch(error => { return res.status(500).json({ message: 'request api failed ' + error }) })
    },
    getHistoryApiForUser: (req, res) => {
        userId = req.currentUser.user_id;
        Picture.find({ userId }).then((apiHistory) => {
            // console.log("fffffff" + apiHistory.length + "apiHistory")
            res.status(200).json({ apiHistory })
        }).catch(error => { res.status(500).json({ error }) })
    },
}

const requestApi = (req, res) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: "GET",
            url: `https://api.nasa.gov/planetary/apod?api_key=IOB0sXS0Lab5lWjhrBhVIHTutp7hAhZOOjLaa86g`
        }
        request(options, function (err, res, body) {
            if (err)
                reject(err)
            else
                resolve(body)
        })

    })
}