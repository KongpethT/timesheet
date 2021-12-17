module.exports = (app) => {
    const index = require('../controller/client_type_controller')

    app.get('/client_type', index.client_type)
    app.post('/client_type', index.setClient_type)
}