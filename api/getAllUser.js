const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
require('../models/UserDetailSchema')
const User = mongoose.model('UserInfo')

router.get('/', async (req, res) => {
    try {
        const allUser = await User.find({})
        res.send({ status: 'ok', data: allUser })
    } catch (error) {
        console.log(error)
    }
})
module.exports = router
