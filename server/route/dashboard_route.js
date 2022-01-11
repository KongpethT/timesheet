const express = require('express')
const router = express.Router()


const { gets, dataAnalyticsPerYear, dataAnalyticsPerMonth } = require('../controller/dashboard_controller')
router.route('/')
    .get(gets)

router.route('/timeline/count/activity/year/:para')
    .get(dataAnalyticsPerYear)

router.route('/timeline/count/activity/month/:para')
    .get(dataAnalyticsPerMonth)

module.exports = router