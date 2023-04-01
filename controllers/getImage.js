require('../models/ImageDetailsSchema')
const mongoose = require('mongoose')
const Images = mongoose.model('ImageDetails')

const getImage = async (req, res) => {
    try {
        await Images.find({}).then((data) => {
            res.send({ status: 'ok', data: data })
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = getImage
