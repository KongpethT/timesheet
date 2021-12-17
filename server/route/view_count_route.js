module.exports = (app) => {
    const index = require('../controller/view_count_controller')
    app.get('/count_activity/:code', index.count_activity)
}