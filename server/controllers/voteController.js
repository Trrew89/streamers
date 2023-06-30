const ApiError = require('../error/ApiError')
const Vote = require('../models/Vote')

class VoteController {
    async create(req, res, next) {
        const { userId, vote, streamerId } = req.body;
        console.log(userId, vote, streamerId)
        try {
            const existingVote = await Vote.findOne({ userId: userId, streamerId: streamerId });
            if (!existingVote) {
                const newVote = new Vote({
                    userId: userId,
                    streamerId: streamerId,
                    vote: vote
                });
                
                await newVote.save().then(function (models) {
                    console.log(models);
                  })
                  .catch(function (err) {
                    console.log(err);
                  });;;
                
                return next()
            } else {
                return res.status(200).json({ message: 'You have already voted for this streamer' });
            }       
        } catch (error) {
            next(ApiError.internal('An error occurred while saving the vote'))
        }
    }
}

module.exports = new VoteController()