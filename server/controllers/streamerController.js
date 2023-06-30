const ApiError = require('../error/ApiError')
const Streamer = require('../models/Streamer')

class StreamerController {
    async getAll (req, res, next) {
        try {
            let streamers = await Streamer.find()
            if(streamers.length === 0){
                return next(ApiError.badRequest('No streamers yet, add one'))
            }
            return res.json(streamers)
        } catch (error) {
            console.log(error)
        }
        
    }


    async getOne (req, res, next) {
        try {
            const {id} = req.params
            const streamer = await Streamer.findById(id)
            if(!streamer) {
                return next(ApiError.badRequest('Streamer not found'))
            }
            return res.json(streamer) 
        } catch (error) {
            console.log(error)
        }
    }


    async create (req, res, next) {
        const {name, platform, description} = req.body
        try {
            const existingStreamer = await Streamer.findOne({ name: name });
            if (existingStreamer) {
                return next(ApiError.badRequest('Streamer with the same name already exists'))
            }
                const streamer = await Streamer.create({name, platform, description});
            res.json('New streamer added successfully')
            
          } catch (error) {
            next(ApiError.badRequest('Failed to create streamer'))
          }
    }


    async changeRating (req, res, next) {
        const { vote, streamerId } = req.body;
        try {
            const streamer = await Streamer.findById(streamerId);
            if (vote === 'upvote') {
                streamer.votes += 1;
            } else if (vote === 'downvote') {
                streamer.votes -= 1;
            }
            
            await streamer.save().then(function (models) {
                return res.json({ message: 'You voted successfully' })
              })
              .catch(function (err) {
                console.log(err); 
              });;
        } catch (error) {
            next(ApiError.internal('Something went wrong with rating update'))
        }
    }
}

module.exports = new StreamerController()