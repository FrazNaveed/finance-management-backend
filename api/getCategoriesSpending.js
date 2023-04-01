require('../models/ExpensesSchema')
const mongoose = require('mongoose')
const Expense = mongoose.model('Expenses')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const { email } = req.query
    const currentMonth = new Date().toLocaleString('default', { month: 'long' })

    Expense.aggregate([
        // Match expenses for specific user
        {
            $match: {
                userId: email,
                month: currentMonth,
            },
        },
        // Group by category and sum amounts
        {
            $group: {
                _id: '$category',
                totalAmount: { $sum: '$amount' },
            },
        },
        // Project the desired output fields
        {
            $project: {
                id: 1,
                category: '$_id',
                amount: '$totalAmount',
            },
        },
    ]).then((response) => {
        return res.send(response)
    })
})
module.exports = router
