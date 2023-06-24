const Router = require('express')
const userRouter = require('./userRouter')
const streamerRouter = require('./streamerRouter')
const router = new Router()

router.use('/user', userRouter)
router.use('/streamers', streamerRouter)

module.exports = router