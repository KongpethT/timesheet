const { config } = require("../configure/env")

//@router GET /api/dashboard
exports.gets = (req, res) => { }
//@router GET /api/dashboard/timeline/count/activity
/**count for per year */
exports.dataAnalyticsPerYear = (req, res) => {
    const brick = req.params.para
    console.log(brick);
    const sqlString = `SELECT
    sum(visit_call) AS count_call,
    sum(visit_AM) AS count_visit_am,
    sum(visit_PM) AS count_visit_pm,
    sum(site_tour_AM) AS count_site_tour_am,
    sum(site_tour_PM) AS count_site_tour_pm,
    sum(lunch) AS count_lunch,
    sum(dinner) AS count_dinner,
    COUNT(others) AS count_other
FROM
    timeline
WHERE
    date like'${brick}%'`
    config.get_connect.query(sqlString, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result[0])
        }
    })
}

exports.dataAnalyticsPerMonth = (req, res) => {
    console.log('workHere');
}