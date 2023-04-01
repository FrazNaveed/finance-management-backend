const mongoose = require('mongoose')
require('../models/UserDetailSchema')
const User = mongoose.model('UserInfo')
const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find({})
        res.send({ status: 'ok', data: allUser })
    } catch (error) {
        console.log(error)
    }
}
module.exports = getAllUser
