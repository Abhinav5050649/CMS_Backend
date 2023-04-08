const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

const conSchema = new Schema({
    userId: {

    },
    name: {
        type: String, 
        required: true
    },
    phoneNumber: {
        type: String, 
        required: true,
        unique: true
    },
    email: {
        type: String, 
        unique: true
    },
    address: {
        type: String
    }
})

const Contact = mongoose.model('contact', conSchema)
module.exports = Contact