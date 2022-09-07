const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter something']
    },
    email: {
        type: String,
        required: [true, 'Please enter something'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter something']
    },

},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)