module.exports = (app) => {
    const index = require("../controller/debug_controller")
    app.get("/debug", index.debug)
}