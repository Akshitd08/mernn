const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')
const User = require('../model/userModel')
//POST
const setgoals = asyncHandler(async (req, res) => {
    if(!req.body.text){
        throw new Error('please add text');
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal);
})
//GET
const getgoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id})
    res.status(200).json(goals);
})
//PUT
const updategoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new error('Goal not found')
    }
    //THIS PART IS FOR THAT ONE USER CANNOT CHANGE OTHER USER'S GOALS
    //get user by id
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('not authorized')
    }
    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('not authorized')
    }
    
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedGoal);
})
//DELETE
const deletegoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new error('Goal not found')
    }
    //THIS PART IS FOR THAT ONE USER CANNOT DELETE OTHER USER'S GOALS
    //get user by id
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('not authorized')
    }
    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('not authorized')
    }

    await goal.remove()
    res.status(200).json({ id: req.params.id});
})

module.exports = { setgoals, getgoals, updategoals, deletegoals }