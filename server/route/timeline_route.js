module.exports = (app) => {
    const index = require('../controller/timeline_controller')
    app.get('/timeline', index.timeline)
    app.post('/timeline', index.setTimeline)
    app.post('/update_timeline', index.update_timeline)

}
//////////