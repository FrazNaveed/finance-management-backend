const mongoose = require('mongoose')
const generateMoneySavingTip = require('../utils/generateMoneySavingTip')
require('../models/ExpensesSchema')
require('../models/UserDetailSchema')
const Expense = mongoose.model('Expenses')
const User = mongoose.model('UserInfo')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const { email } = req.query
    const currentMonth = new Date().toLocaleString('default', { month: 'long' })

    const expenses = await Expense.aggregate([
        {
            $match: { userId: email, month: currentMonth },
        },
        {
            $group: {
                _id: '$category',
                amount: { $sum: '$amount' },
            },
        },
        {
            $project: {
                _id: 0,
                category: '$_id',
                amount: 1,
            },
        },
    ])

    const userIncome = await User.findOne({ email })
    const income = userIncome.income

    const tip = generateMoneySavingTip(expenses, income)

    return res.send(tip)
})
module.exports = router
