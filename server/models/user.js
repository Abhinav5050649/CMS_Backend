const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

const userSchema = new Schema({
    'Name': {
        type: String, 
        required: true
    },
    'primaryNumber': {
        type: String,
        required: true,
        unique: true
    }, 
    'email': {
        type: String,
        required: true,
        unique: true
    },
    'password': {
        type: String, 
        required: true
    }
})

const User = mongoose.Schema('user', userSchema)
module.exports = User