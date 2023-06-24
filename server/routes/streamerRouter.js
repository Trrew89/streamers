const Router = require('express')
const router = new Router()
const streamerController = require('../controllers/streamerController')
const voteController = require('../controllers/voteController')

router.all('/', function (req,res,next) {
    if(req.method === 'GET') {
        streamerController.getAll(req, res, next)
    } else if (req.method === 'POST'){
        streamerController.create(req, res, next)
    }
})
router.get('/:id', streamerController.getOne)
router.put('/:id/vote',  voteController.create, streamerController.changeRating)
module.exports = router 