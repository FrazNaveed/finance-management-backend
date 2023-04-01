const mongoose = require('mongoose')

const UserDetailsScehma = new mongoose.Schema(
    {
        fname: String,
        lname: String,
        email: { type: String, unique: true },
        password: String,
        userType: String,
        income: Number,
    },
    {
        collection: 'UserInfo',
    }
)

mongoose.model('UserInfo', UserDetailsScehma)
