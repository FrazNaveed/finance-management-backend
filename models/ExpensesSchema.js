const mongoose = require('mongoose')

const ExpensesSchema = new mongoose.Schema(
    {
        expenseName: String,
        category: String,
        date: Date,
        time: String,
        amount: Number,
        userId: String,
        month: String,
    },
    {
        collection: 'Expenses',
    }
)

mongoose.model('Expenses', ExpensesSchema)
