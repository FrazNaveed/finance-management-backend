const mongoose = require('mongoose')
require('../models/UserDetailSchema')
const User = mongoose.model('UserInfo')

const paginatedUsers = async (req, res) => {
    const allUser = await User.find({})
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const lastIndex = page * limit

    const results = {}
    results.totalUser = allUser.length
    results.pageCount = Math.ceil(allUser.length / limit)

    if (lastIndex < allUser.length) {
        results.next = {
            page: page + 1,
        }
    }
    if (startIndex > 0) {
        results.prev = {
            page: page - 1,
        }
    }
    results.result = allUser.slice(startIndex, lastIndex)
    res.json(results)
}

module.exports = paginatedUsers
