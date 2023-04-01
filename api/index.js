const updatePassword = require('./updatePassword')
const updateIncome = require('./updateIncome')
const getSavingTip = require('./getSavingTip')
const getBarChartData = require('./getBarChartData')
const getPieChartData = require('./getPieChartData')
const getCategoriesSpending = require('./getCategoriesSpending')
const getTodayExpenses = require('./getTodayExpenses')
const deleteExpense = require('./deleteExpense')
const getPreviousExpenses = require('./getPreviousExpenses')
const saveExpense = require('./saveExpense')
const register = require('./register')
const loginUser = require('./loginUser')
const userData = require('./userData')
const forgotPassword = require('./forgotPassword')
const resetPassword = require('./resetPassword')
const getAllUser = require('./getAllUser')
const deleteUser = require('./deleteUser')
const uploadImage = require('./uploadImage')
const getImage = require('./getImage')
const paginatedUsers = require('./paginatedUsers')

const controllers = {
    updatePassword,
    updateIncome,
    getSavingTip,
    getBarChartData,
    getPieChartData,
    getCategoriesSpending,
    getTodayExpenses,
    deleteExpense,
    getPreviousExpenses,
    saveExpense,
    register,
    loginUser,
    userData,
    forgotPassword,
    resetPassword,
    getAllUser,
    deleteUser,
    uploadImage,
    getImage,
    paginatedUsers,
}
module.exports = controllers
