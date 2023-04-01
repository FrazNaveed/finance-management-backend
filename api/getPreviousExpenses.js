require('../models/ExpensesSchema')
const mongoose = require('mongoose')
const Expense = mongoose.model('Expenses')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const { email } = req.query

    const today = new Date()
    const startOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    )
    const filter = {
        userId: email,
        date: { $lt: startOfToday },
    }
    const pipeline = [
        { $match: filter },
        {
            $group: {
                _id: {
                    year: { $year: '$date' },
                    month: { $month: '$date' },
                    day: { $dayOfMonth: '$date' },
                },
                expenses: { $push: '$$ROOT' },
            },
        },
        {
            $project: {
                _id: {
                    _date: {
                        $dateFromParts: {
                            year: '$_id.year',
                            month: '$_id.month',
                            day: '$_id.day',
                        },
                    },
                },
                expenses: 1,
            },
        },
        { $sort: { '_id._date': -1 } },
    ]

    Expense.aggregate(pipeline).then((result) => {
        return res.send(result)
    })
})

module.exports = router
