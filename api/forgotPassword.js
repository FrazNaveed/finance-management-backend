const mongoose = require('mongoose')
require('../models/UserDetailSchema')
const User = mongoose.model('UserInfo')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
var nodemailer = require('nodemailer')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    const { email } = req.body
    try {
        const oldUser = await User.findOne({ email })
        if (!oldUser) {
            return res.json({ status: 'User Not Exists!!' })
        }
        const secret = JWT_SECRET + oldUser.password
        const token = jwt.sign(
            { email: oldUser.email, id: oldUser._id },
            secret,
            {
                expiresIn: '5m',
            }
        )
        const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'adarsh438tcsckandivali@gmail.com',
                pass: 'rmdklolcsmswvyfw',
            },
        })

        var mailOptions = {
            from: 'youremail@gmail.com',
            to: 'thedebugarena@gmail.com',
            subject: 'Password Reset',
            text: link,
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log('Email sent: ' + info.response)
            }
        })
        console.log(link)
    } catch (error) {
        console.log(error)
    }
})
module.exports = router
