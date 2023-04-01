require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const controllers = require('./controllers/index')

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

app.post('/updatePassword', controllers.updatePassword)
app.post('/updateIncome', controllers.updateIncome)
app.get('/getSavingTip', controllers.getSavingTip)
app.get('/getBarChartData', controllers.getBarChartData)
app.get('/getPieChartData', controllers.getPieChartData)
app.get('/getCategoriesSpending', controllers.getCategoriesSpending)
app.get('/getTodayExpenses', controllers.getTodayExpenses)
app.post('/deleteExpense', controllers.deleteExpense)
app.get('/getPreviousExpenses', controllers.getPreviousExpenses)
app.post('/saveExpense', controllers.saveExpense)
app.post('/register', controllers.register)
app.post('/login-user', controllers.loginUser)
app.post('/userData', controllers.userData)
app.post('/forgot-password', controllers.forgotPassword)
app.post('/reset-password/:id/:token', controllers.resetPassword)
app.get('/getAllUser', controllers.getAllUser)
app.post('/deleteUser', controllers.deleteUser)
app.post('/upload-image', controllers.uploadImage)
app.get('/get-image', controllers.getImage)
app.get('/paginatedUsers', controllers.paginatedUsers)

app.listen(process.env.PORT || 5000, () => {
    console.log('Server Started')
})
