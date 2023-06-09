const mongoose = require('mongoose')

const natureSchema = new mongoose.Schema({
    name: String,
    statUp: String,
    statDown: String
}, {
    timestamps: true
})



module.exports = mongoose.model('Nature', natureSchema)