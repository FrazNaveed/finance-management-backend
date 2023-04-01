require('../models/ExpensesSchema')
const mongoose = require('mongoose')
const Expense = mongoose.model('Expenses')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const { email } = req.query
    const today = new Date()
    const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    )
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000 - 1)
    Expense.find({
        userId: email,
        date: {
            $gte: startOfDay,
            $lte: endOfDay,
        },
    }).then((result) => {
        return res.send(result)
    })
})

module.exports = router
