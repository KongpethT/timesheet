module.exports = (app) => {
    const index = require('../controller/customer_controll')
    app.get('/customer/:userCode/:stateCode', index.read)
    app.post('/customer', index.create)
    app.put('/customer', index.update)
    app.delete('/customer', index.delete)
}