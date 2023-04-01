require('../models/ImageDetailsSchema')
const mongoose = require('mongoose')
const Images = mongoose.model('ImageDetails')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        await Images.find({}).then((data) => {
            res.send({ status: 'ok', data: data })
        })
    } catch (error) {
        console.log(error)
    }
})
module.exports = router
