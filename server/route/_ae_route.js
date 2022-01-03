module.exports = (app) => {
    const index = require('../controller/ae_controller')
    //app.get('/ae', index.ae)
    //app.post('/ae', index.setAe)

    app.route('/ae')
        .get(index.ae)
        .post(index.ae_)
}


