const mongoose = require(`mongoose`)
require(`dotenv`).config()

mongooseURL = process.env.DB

const connectToMongo = () => {
    mongoose.connect(mongooseURL, () => {
        console.log(`Connected to DB`)
    })
}

module.exports = connectToMongo