const mongoose = require('mongoose')
require('../models/UserDetailSchema')
const User = mongoose.model('UserInfo')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { email, income } = req.body
        const user = await User.findOneAndUpdate(
            { email },
            { income },
            { new: true }
        )

        if (!user) {
            return res.status(404).send({ message: 'User not found' })
        }

        return res.send({ message: 'Updated successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Internal server error' })
    }
})

module.exports = router
