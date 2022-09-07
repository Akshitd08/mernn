const express = require('express')
const router = express.Router()
const {registerUsers,loginUsers,getUsers} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')
//for registration
router.post('/', registerUsers)
//for login 
router.post('/login', loginUsers)
//for user data
router.get('/me', getUsers, protect)

module.exports = router