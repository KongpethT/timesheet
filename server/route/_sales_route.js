
module.exports = (app) => {
    const index = require('../controller/_sales_controller')
    app.get('/sales/:user_code/:state_code', index.sales_read)
    app.post('/sales', index.sales_create)
    app.put('/sales', index.sales_update)
    app.delete('/sales', index.sales_delete)
}