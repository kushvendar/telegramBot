const mongoose = require('mongoose')

const userSchema  = new mongoose.Schema({
    chatId:{type: String, require: true, unique: true},
    isEnabled:{type: Boolean, default: true},
    frequency:{type: Number, default: 1 },
    lastSent:{type: Date, default: new Date()}
})

module.exports = mongoose.model("User", userSchema)