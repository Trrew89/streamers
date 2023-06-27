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
            const {streamerId} = req.params
            const streamer = await Streamer.findOne(streamerId)

            if(!streamer) {
                return next(ApiError.badRequest('Streamer not found'))
            }

            return res.json(streamer)
        } catch (error) {
            return next(ApiError.badRequest('Something went wrong'))
        }
    }


    async create (req, res, next) {
        const {name, platform, description} = req.body
        try {
            const existingStreamer = await Streamer.findOne({ name: name });
            if (existingStreamer) {
                return next(ApiError.badRequest('Streamer with the same name already exists'))
            }

            // const newStreamer = new Streamer({
            //     name: name,
            //     platform: platform,
            //     description: description,
            // });
            // await newStreamer.save().then(function (models) {
            //     console.log(models);
            //     return res.json({ message: 'Created streamer successfully' });
            //   })
            //   .catch(function (err) {
            //     console.log(err);
            //   }); 
            try {
                const streamer = await Streamer.create({name, platform, description});
            } catch (error) {
                return res.json(error);
            }
            res.json('New streamer added successfully')
            
          } catch (error) {
            next(ApiError.badRequest('Failed to create streamer'))
          }
    }


    async changeRating (req, res, next) {
        const { vote, streamerId } = req.body;
        console.log('streamer')
        try {
            const streamer = await Streamer.findById(streamerId);
            if (vote === 'upvote') {
                streamer.votes += 1;
            } else if (vote === 'downvote') {
                streamer.votes -= 1;
            }
            
            await streamer.save().then(function (models) {
                console.log(models);
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