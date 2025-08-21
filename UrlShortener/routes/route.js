const express = require('express');
const {handleShortURL,handleAnalytics} = require('../controllers/control')

const router = express.Router()

router.post("/" , handleShortURL)
router.get('/analytics/:shortId',handleAnalytics)

module.exports = router