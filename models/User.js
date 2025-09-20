const mongoose = require('mongoose')
const { type } = require('os')
const { monitorEventLoopDelay } = require('perf_hooks')
const { boolean, date } = require('zod')

const userSchema  = new mongoose.Schema({
    chatId:{type: String, require: true, unique: true},
    isEnabled:{type : boolean, default: true},
    frequency:{type: Number, default: 1 },
    lastSentAt:{type: date, default: new Date() }
})

module.exports = mongoose.model("User", userSchema)