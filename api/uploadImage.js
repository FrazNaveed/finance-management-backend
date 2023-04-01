require('../models/ImageDetailsSchema')
const mongoose = require('mongoose')
const Images = mongoose.model('ImageDetails')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    const { base64 } = req.body
    try {
        await Images.create({ image: base64 })
        res.send({ Status: 'ok' })
    } catch (error) {
        res.send({ Status: 'error', data: error })
    }
})

module.exports = router
