const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

//register new user
//POST api/user
// Access public
const registerUsers = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    //check if user already exist 
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User already exist')
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    //create a user
    const user = await User.create({
        name,
        email,
        password: hashPassword
    })
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('invalid user data')
    }
})

//authenticate new user OR login
//POST api/user/login
// Access public
const loginUsers = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    //check for user email
    const user = await User.findOne({ email });
    console.log(email)

    //second parameter in if is for pssword it is in encryped for done to decrypt it or to match with plain text
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('invalid credentials')
    }
})

//get new user data OR gonna get current login user data
//GET api/user/me 
// Access private
const getUsers = asyncHandler(async (req, res) => {
    res.json({ 'message': 'user data done' })
})

//GET JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SCERET, { expiresIn: '30d' })
}

module.exports = { registerUsers, loginUsers, getUsers }