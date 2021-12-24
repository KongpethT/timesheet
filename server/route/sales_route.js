
module.exports = (app) => {
    const index = require('../controller/sales_controller')
    app.get('/sales', index.sales_read)
    app.post('/sales', index.sales_create)
    app.put('/sales', index.sales_update)
    app.delete('/sales', index.sales_delete)

    //app.post('/sales/create', index.sales_create)
    //app.post('/sales/update', index.sales_update)
    //app.post('/sales/delete', index.sales_delete)
}