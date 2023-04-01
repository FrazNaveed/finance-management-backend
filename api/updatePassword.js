const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('../models/UserDetailSchema')
const User = mongoose.model('UserInfo')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    const { email, password } = req.body
    const encryptedPassword = await bcrypt.hash(password, 10)
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { password: encryptedPassword },
            { new: true }
        )
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' })
        }
        return res.json({ message: 'Password updated successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Server error' })
    }
})

module.exports = router
