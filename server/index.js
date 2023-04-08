const connectToMongo = require(`./db`)
const express = require(`express`)
const cors = require(`cors`)
const port = 5000
const app = express()
connectToMongo()

app.use(express.json())
app.use(cors())

app.use(`/api/auth`, require(`./routes/auth`))
app.use(`/api/cont`, require(`./routes/cont`))

app.get(`/`, (req, res) => {
    res.send(`Testing!`)
})

app.listen(port, () => {
    console.log(`App listening on PORT: ${port}`)
})