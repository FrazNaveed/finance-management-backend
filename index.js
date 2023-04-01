require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const controllers = require('./api/index')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const mongoUrl = process.env.MONGO_URL

mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log('Connected to database')
    })
    .catch((e) => console.log(e))

app.use('/updatePassword', controllers.updatePassword)
app.use('/updateIncome', controllers.updateIncome)
app.use('/getSavingTip', controllers.getSavingTip)
app.use('/getBarChartData', controllers.getBarChartData)
app.use('/getPieChartData', controllers.getPieChartData)
app.use('/getCategoriesSpending', controllers.getCategoriesSpending)
app.use('/getTodayExpenses', controllers.getTodayExpenses)
app.use('/deleteExpense', controllers.deleteExpense)
app.use('/getPreviousExpenses', controllers.getPreviousExpenses)
app.use('/saveExpense', controllers.saveExpense)
app.use('/register', controllers.register)
app.use('/login-user', controllers.loginUser)
app.use('/userData', controllers.userData)
app.use('/forgot-password', controllers.forgotPassword)
app.use('/reset-password/:id/:token', controllers.resetPassword)
app.use('/getAllUser', controllers.getAllUser)
app.use('/deleteUser', controllers.deleteUser)
app.use('/upload-image', controllers.uploadImage)
app.use('/get-image', controllers.getImage)
app.use('/paginatedUsers', controllers.paginatedUsers)

app.listen(process.env.PORT || 5000, () => {
    console.log('Server Started')
})
