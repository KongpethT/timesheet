module.exports = (app) => {
    const index = require('../controller/change_password_controller')

    app.route('/change_password')
        .get(index.change_password)
        .post(index.change_password_)
}
