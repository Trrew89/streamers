const {Schema, model} = require('mongoose')

const Vote = new Schema({
    userId: {type: Schema.Types.ObjectId, ref:'User', required: true},
    streamerId: {type: Schema.Types.ObjectId, ref:'Streamer', required: true},
    vote: {type: String, enum: ['upvote', 'downvote'], required: true}
})

module.exports = model('Vote', Vote)