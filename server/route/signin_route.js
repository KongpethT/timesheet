module.exports = (app) => {
    const index = require('../controller/signin_controller')

    app.post('/signin', index.signin)
}