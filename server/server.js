process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors"); // let other client use api
const morgan = require('morgan')
const compression = require('compression')
//const multer = require('multer') //Upload files
global.bcrypt = require('bcryptjs')
global.jwt = require('jsonwebtoken') // create token
global.config = require('./configure/env')
global.fs = require('fs')
global.alert_message = null
const tr = require("./configure/routing_register.json")

if (process.env.NODE_ENV === 'development') {
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
require("./configure/database") // {conn}
require('./configure/date_time') // {date|time}
require('./configure/log_generate') //{save_log_file}
tr.routing.map((row, index) => {
    require(row.name)(app)
})

module.exports = app
app.listen(3001, "0.0.0.0", () => {
    console.log("server is running at http://127.0.0.1:3001")
})

//
/*
app.post("/upload", (req, res) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../public/image/cover/')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
    const upload = multer({ storage: storage }).single('file')
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
})

*/


