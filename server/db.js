const mongoose = require(`mongoose`)

mongooseURL = ``
const connectToMongo = () => {
    mongoose.connect(mongooseURL, () => {
        console.log(`Connected to DB`)
    })
}

module.exports = connectToMongo