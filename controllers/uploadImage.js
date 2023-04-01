require('../models/ImageDetailsSchema')
const mongoose = require('mongoose')
const Images = mongoose.model('ImageDetails')

const uploadImage = async (req, res) => {
    const { base64 } = req.body
    try {
        await Images.create({ image: base64 })
        res.send({ Status: 'ok' })
    } catch (error) {
        res.send({ Status: 'error', data: error })
    }
}

module.exports = uploadImage
