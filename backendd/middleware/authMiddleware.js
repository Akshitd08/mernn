const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        try {
            //gettin token from header 
            //token is in format of bearer njsdf3(token) <-- this is what we wnt to extract
            token = req.headers.authorization.split(' ')[1]
            //verify token
            
            const decoded = jwt.verify(token, process.env.JWT_SCERET)
            //GET USER FROM TOKEN
            req.user = await User.findById(decoded.id).select('-password')
            req.user = decoded;
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }