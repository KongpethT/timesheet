const { config } = require('./configure/env')
global.alert_message = null

const express = require("express")
const https = require('https')
const dotenv = require('dotenv');
const colors = require('colors');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path')

const bodyParser = require('body-parser')
const compression = require('compression')

dotenv.config({ path: './config/.env' });

const app = express()
const router = express.Router();

if (process.env.NODE_ENV === 'development') {
    app.use(require('morgan')('dev'))
} else {
    app.use(require('compression'))
}

app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))
app.use(helmet())

app.use(cors())
app.use(express.json())

//middleware
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

// All routes here
app.use('/api/signin', require('./route/signin_route'))
app.use('/api/timeline', require('./route/timeline_route'))
app.use('/api/customer', require('./route/customer_route'))
app.use('/api/person', require('./route/person_route'))

// Custom middleware here
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001
const server = https.createServer(config.get_certificate, app)
server.listen(PORT, '0.0.0.0', () => {
    console.log(`server up and running in ${process.env.NODE_ENV} mode on port https://127.0.0.1:${PORT}`.yellow.bold)
})

