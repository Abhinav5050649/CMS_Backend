const mongoose = require(`mongoose`)
require(`dotenv`).config()

const mongooseURL = `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.xco2bpk.mongodb.net/testdb?retryWrites=true&w=majority`

const connectToMongo = () => {
    mongoose.connect(mongooseURL, () => {
        console.log(`Connected to DB`)
    })
}

module.exports = connectToMongo