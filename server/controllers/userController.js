const ApiError = require('../error/ApiError')
const User = require('../models/User')

class UserController {
    async registration (req, res, next) {
        try {
            const {email, password} = req.body
            if(!email || !password) {
                return next(ApiError.badRequest('Wrong email or password'))
            }
            const candidate = await User.findOne({email})
            if(candidate) {
                return next(ApiError.badRequest('User with this email already exist'))
            }
            const user = await User.create({email, password})
            res.json('User created successfully')
        } catch (error) {
            console.log(error)
            next(ApiError.badRequest('Registration error'))
        }
    }

    async login (req, res, next) {
        try {
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if(!candidate) {
                return next(ApiError.badRequest('User with this email does not exist'))
            }
            if(password !==candidate.password) {
                return next(ApiError.badRequest('Wrong password'))
            }

            return res.json({message: candidate._id})
        } catch (error) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}

module.exports = new UserController()