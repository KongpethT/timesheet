module.exports = (app) => {
    const index = require("../controller/blogs_controller");
    app.get('/blogs', index.blogs)
    app.post('/blogs',index.blogs_)
}

