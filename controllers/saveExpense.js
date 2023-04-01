require('../models/ExpensesSchema')
const mongoose = require('mongoose')
const Expense = mongoose.model('Expenses')

const saveExpense = async (req, res) => {
    const { expenseName, category, date, time, amount, userId, month } =
        req.body

    console.log(req.body)

    if (!expenseName || !category || !date || !time || !amount || !userId) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    try {
        await Expense.create({
            expenseName,
            category,
            date,
            time,
            amount,
            userId,
            month,
        })

        return res.send({ status: 'ok' })
    } catch (e) {
        return res.send({ status: e })
    }
}
module.exports = saveExpense
