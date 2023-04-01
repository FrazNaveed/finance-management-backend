require('../models/ExpensesSchema')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Expense = mongoose.model('Expenses')

router.get('/', async (req, res) => {
    const { email } = req.query

    try {
        const result = await Expense.collection
            .aggregate([
                { $match: { userId: email } },
                { $match: {} },
                {
                    $addFields: {
                        month_number: {
                            $switch: {
                                branches: [
                                    {
                                        case: { $eq: ['$month', 'January'] },
                                        then: 1,
                                    },
                                    {
                                        case: { $eq: ['$month', 'February'] },
                                        then: 2,
                                    },
                                    {
                                        case: { $eq: ['$month', 'March'] },
                                        then: 3,
                                    },
                                    {
                                        case: { $eq: ['$month', 'April'] },
                                        then: 4,
                                    },
                                    {
                                        case: { $eq: ['$month', 'May'] },
                                        then: 5,
                                    },
                                    {
                                        case: { $eq: ['$month', 'June'] },
                                        then: 6,
                                    },
                                    {
                                        case: { $eq: ['$month', 'July'] },
                                        then: 7,
                                    },
                                    {
                                        case: { $eq: ['$month', 'August'] },
                                        then: 8,
                                    },
                                    {
                                        case: { $eq: ['$month', 'September'] },
                                        then: 9,
                                    },
                                    {
                                        case: { $eq: ['$month', 'October'] },
                                        then: 10,
                                    },
                                    {
                                        case: { $eq: ['$month', 'November'] },
                                        then: 11,
                                    },
                                    {
                                        case: { $eq: ['$month', 'December'] },
                                        then: 12,
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: '$month_number',
                        totalAmount: { $sum: '$amount' },
                    },
                },
                {
                    $addFields: {
                        month_name: {
                            $switch: {
                                branches: [
                                    { case: { $eq: ['$_id', 1] }, then: 'Jan' },
                                    { case: { $eq: ['$_id', 2] }, then: 'Feb' },
                                    { case: { $eq: ['$_id', 3] }, then: 'Mar' },
                                    { case: { $eq: ['$_id', 4] }, then: 'Apr' },
                                    { case: { $eq: ['$_id', 5] }, then: 'May' },
                                    { case: { $eq: ['$_id', 6] }, then: 'Jun' },
                                    { case: { $eq: ['$_id', 7] }, then: 'Jul' },
                                    { case: { $eq: ['$_id', 8] }, then: 'Aug' },
                                    {
                                        case: { $eq: ['$_id', 9] },
                                        then: 'Sept',
                                    },
                                    {
                                        case: { $eq: ['$_id', 10] },
                                        then: 'Oct',
                                    },
                                    {
                                        case: { $eq: ['$_id', 11] },
                                        then: 'Nov',
                                    },
                                    {
                                        case: { $eq: ['$_id', 12] },
                                        then: 'Dec',
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    $sort: { _id: 1 },
                },
            ])
            .toArray()

        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server' })
    }
})

module.exports = router
