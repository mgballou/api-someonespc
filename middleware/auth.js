// dependencies

const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const {Strategy, ExtractJwt } = require('passport-jwt')


// config

const secret = process.env.JWT_SECRET || 'temporary unique secret'

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}


async function verify(jwt_payload, done){

    try {
        const user = await User.findById(jwt_payload.id)
        return done(null, user)
    }catch(error){
       return done(error)
    }

}

const strategy = new Strategy(opts, verify)


passport.use(strategy)


passport.initialize()

// auth functions

const requireToken = passport.authenticate('jwt', {session: false})

function createUserToken (req, user) {
    if(
        !user ||
        !req.body.password ||
        !bcrypt.compareSync(req.body.password, user.password)
        ){
        const error = new Error("The provided username or password is incorrect")
        error.statusCode = 422
        throw error
}

return jwt.sign({id: user._id}, secret, {expiresIn: 36000 })

}

function handleValidateOwnership (req, document) {
    const ownerId = document.owner._id || document.owner 

    if(!req.user._id.equals(ownerId)){
        throw Error('Unauthorized Access')
    }else {
        return document 
    }

}

module.exports = {
    requireToken,
    createUserToken,
    handleValidateOwnership
}