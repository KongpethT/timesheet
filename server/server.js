const { config } = require('./configure/env')
global.alert_message = null
//global.bcrypt = require('bcryptjs')


const express = require("express")
const https = require('https')
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors"); // let other client use api
const morgan = require('morgan')
const compression = require('compression')
const tr = require("./configure/routing_register.json")

if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev'))
    console.log('::developer')
} else {
    app.use(compression)
    console.log('::production');
}

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

tr.routing.map((row, index) => {
    require(row.name)(app)
})


module.exports = app
const server = https.createServer(config.get_certificate, app)
const port = 3001
server.listen(port, '0.0.0.0', () => {
    console.log("server is running at https://127.0.0.1:" + port)
})




