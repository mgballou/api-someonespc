const mongoose = require('mongoose')


const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dexNumber: {
        type: Number,
        required: true
    },
    sprite: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        default: ''
    },
    type1: String,
    type2: String,
    abilities: {
        current: { type: String, default: '' },
        all: Array
    },
    stats: {},
    heldItem: { type: String, default: '' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

}
)

module.exports = mongoose.model('Pokemon', pokemonSchema)