require('../models/ExpensesSchema')
const mongoose = require('mongoose')
const Expense = mongoose.model('Expenses')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const { email } = req.query
    const result = await Expense.aggregate([
        { $match: { userId: email } },
        {
            $group: {
                _id: '$category',
                totalAmount: { $sum: '$amount' },
            },
        },
        {
            $project: {
                category: '$_id',
                totalAmount: 1,
                _id: 0,
            },
        },
    ]).exec()

    return res.send(result)
})
module.exports = router
