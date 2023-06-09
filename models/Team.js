const mongoose = require('mongoose')



const teamSchema = new mongoose.Schema({
    name: String,
    pokemon: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

})


module.exports = mongoose.model('Team', teamSchema)