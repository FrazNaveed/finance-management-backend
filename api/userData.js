const mongoose = require('mongoose')
require('../models/UserDetailSchema')
const User = mongoose.model('UserInfo')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET

router.post('/', async (req, res) => {
    const { token } = req.body

    try {
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if (err) {
                return 'token expired'
            }
            return res
        })
        if (user == 'token expired') {
            return res.send({ status: 'error', data: 'token expired' })
        }

        const useremail = user.email
        User.findOne({ email: useremail })
            .then((data) => {
                res.send({ status: 'ok', data: data })
            })
            .catch((error) => {
                res.send({ status: 'error', data: error })
            })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
