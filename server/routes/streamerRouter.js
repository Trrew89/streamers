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

module.exports = router;


/* Code for SSE (doesn't work)*/
// router.all('/', async function (req,res,next) {
//     try{
//         if(isFetching) {
//             return ;
//         }
//         if(req.method === 'GET') {
//             // streamerController.getAll(req, res, next)
//             res.setHeader('Content-Type', 'text/event-stream');
//             res.setHeader('Cache-Control', 'no-cache');
//             res.setHeader('Connection', 'keep-alive');
//             res.setHeader('Access-Control-Allow-Origin', '*');
//             res.flushHeaders();
        
//             isFetching = true;
        
//             let streamers = await streamerController.getAll();
//             console.log(streamers)
//             res.write(`data: ${JSON.stringify(streamers)}\n\n`); 
//         } else if (req.method === 'POST'){
//             streamerController.create(req, res, next)
//         }
//     } catch(err) {
//         console.log(err)
//     } finally {
//         isFetching = false
//     }
// })