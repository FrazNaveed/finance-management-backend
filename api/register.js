const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('../models/UserDetailSchema')
const User = mongoose.model('UserInfo')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    const { fname, lname, email, password, userType, income } = req.body

    const encryptedPassword = await bcrypt.hash(password, 10)
    try {
        const oldUser = await User.findOne({ email })

        if (oldUser) {
            return res.json({ error: 'User Exists' })
        }
        await User.create({
            fname,
            lname,
            email,
            password: encryptedPassword,
            userType,
            income,
        })
        res.send({ status: 'ok' })
    } catch (error) {
        res.send({ status: 'error' })
    }
})

module.exports = router
