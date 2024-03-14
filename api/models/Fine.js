const mongoose = require('mongoose')

const fineSchema = new mongoose.Schema({
    identifier: String,
    type: String,
    durationYears: Number,
    durationMonths: Number,
    capital: Number,
    fixed: {
        years: Number,
        months: Number,
        interest: Number,
        spread: Number
    },
    variable: {
        years: Number,
        months: Number,
        interest: Number,
        spread: Number
    },
    spread: Number
})

module.exports = mongoose.model('Fine', fineSchema)
