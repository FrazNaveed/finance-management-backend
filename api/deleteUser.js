const mongoose = require('mongoose')
require('../models/UserDetailSchema')
const User = mongoose.model('UserInfo')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    const { userid } = req.body
    try {
        User.deleteOne({ _id: userid }, function (err) {
            console.log(err)
        })
        res.send({ status: 'Ok', data: 'Deleted' })
    } catch (error) {
        console.log(error)
    }
})
module.exports = router
