require('../models/ExpensesSchema')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const Expense = mongoose.model('Expenses')

const deleteExpense = async (req, res) => {
    const { id } = req.body
    const filter = { _id: new ObjectId(id) }
    const result = await Expense.deleteOne(filter)
    if (result.deletedCount > 0) {
        return res.send('Deleted Successfully')
    } else {
        return res.send('Error Encountered While Deleting')
    }
}
module.exports = deleteExpense
