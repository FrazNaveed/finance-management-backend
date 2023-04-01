const mongoose = require('mongoose')
require('../models/UserDetailSchema')
const User = mongoose.model('UserInfo')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    const { id, token } = req.params
    const { password } = req.body

    const oldUser = await User.findOne({ _id: id })
    if (!oldUser) {
        return res.json({ status: 'User Not Exists!!' })
    }
    const secret = JWT_SECRET + oldUser.password
    try {
        const verify = jwt.verify(token, secret)
        const encryptedPassword = await bcrypt.hash(password, 10)
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        )

        res.render('index', { email: verify.email, status: 'verified' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'Something Went Wrong' })
    }
})

module.exports = router
