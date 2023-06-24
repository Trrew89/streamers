const {Schema, model} = require('mongoose')

const Streamer = new Schema({
    name: {type: String, unique: true, required: true},
    platform: {type: String, required: true},
    description: {type: String, required: true},
    votes: {type: Number, default: 0}
})

module.exports = model('Streamer', Streamer)