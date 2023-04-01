const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('../models/UserDetailSchema')
const User = mongoose.model('UserInfo')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })

    if (!user) {
        return res.json({ error: 'User Not found' })
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET, {
            expiresIn: '15m',
        })

        if (res.status(201)) {
            return res.json({ status: 'ok', data: token })
        } else {
            return res.json({ error: 'error' })
        }
    }
    res.json({ status: 'error', error: 'Invalid Password' })
})
module.exports = router
