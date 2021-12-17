module.exports = (app) => {
    const index = require("../controller/messaged_controller")
    app.get("/message", index.message)
}

