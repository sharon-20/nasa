const express = require('express');
const router = express.Router();
const firebase = require('../middlewares/firebase')
const { getHistoryApiForUser, getApod } = require('../controllers/picture')

router.get('/getHistoryApiForUser', firebase, getHistoryApiForUser);
router.get('/getApod', firebase, getApod);


module.exports = router;