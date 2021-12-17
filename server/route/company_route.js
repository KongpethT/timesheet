module.exports = (app) => {
    const index = require('../controller/company_controller')
   
    app.get('/company', index.company)
    app.post('/company', index.setCompany)
}