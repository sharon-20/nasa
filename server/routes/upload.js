const express = require('express');
const router = express.Router();
const firebase = require('../middlewares/firebase')
const { uploadImg, getMyUploads } = require('../controllers/upload')

router.post('/uploadImg', firebase, uploadImg);
router.get('/getMyUploads', firebase, getMyUploads);


module.exports = router;