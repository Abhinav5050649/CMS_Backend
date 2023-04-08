const mongoose = require(`mongoose`)

mongooseURL = `mongodb+srv://abhinavsharma:abhinavsharma@cluster0.xco2bpk.mongodb.net/testdb?retryWrites=true&w=majority`
const connectToMongo = () => {
    mongoose.connect(mongooseURL, () => {
        console.log(`Connected to DB`)
    })
}

module.exports = connectToMongo