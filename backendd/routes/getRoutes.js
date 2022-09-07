const express = require('express')
const router = express.Router()
const {getgoals,setgoals,updategoals,deletegoals} = require('../controllers/goalControllers')
const { protect } = require('../middleware/authMiddleware')
//get and post request merged in one
router.route('/').get(protect, getgoals).post(protect, setgoals)
//delete and update request merged in one
router.route('/:id').put(protect, updategoals).delete(protect, deletegoals)

module.exports = router
