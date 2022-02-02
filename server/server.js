const { config } = require('./configure/env')
const dotenv = require('dotenv')
dotenv.config()
const myPort = process.env.PORT;
const myAppSecret = process.env.APP_SECRET
const express = require('express')
const app = express()
const morgan = require('morgan')
const compression = require('compression')
const cors = require('cors');

(process.env.NODE_ENV === 'development') ? app.use(morgan('dev')) : app.use(compression())
app.use(cors())
app.use(express.json())

// All routes here
app.use('/api/signin', require('./route/signin_route'))
app.use('/api/timeline', require('./route/timeline_route'))
app.use('/api/customer', require('./route/customer_route'))
app.use('/api/person', require('./route/person_route'))
app.use('/api/sales', require('./route/sales_route'))
app.use('/api/dashboard', require('./route/dashboard_route'))

app.listen(myPort, '0.0.0.0', () => {
    console.log(`server up and running in ${process.env.NODE_ENV} mode on port http://127.0.0.1:${myPort}`)
})
console.log(process.env.NODE_ENV)
