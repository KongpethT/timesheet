module.exports = (app) => {
    const index = require('../controller/register_controller')
    app.post("/register", index.register)
}