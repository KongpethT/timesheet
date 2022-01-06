const { config } = require('../configure/env')


// @route   GET api/timeline
exports.getPosts = (req, res) => {
  //console.log('work this here 1');
}
// @route   GET api/timeline /:id/:id1
exports.getPostById = (req, res) => {
  const brick = req.params
  const accountId = JSON.parse(brick.id)
  let clientType = (brick.id2)
  if (clientType === 'null') { clientType = '' }
  const sqlString = `SELECT * FROM v_timeline where account_id = '${accountId.value}' and client_type LIKE '${clientType}%' `
  config.get_connect.query(sqlString,
    (error, result) => {
      if (error) {
        (process.env.NODE_ENV === 'development') ? console.log(error) : null
      } else {
        res.send(result)
      }
    })
}
//@route POST api/timeline/:id
exports.postPostByQuery = (req, res) => {
  const brick = req.body
  const data = Object.keys(brick).map((key) => {
    return (brick[key])
  })
  const sqlString = 'INSERT INTO timeline (' +
    'account_id,' +
    'date,' +
    'client_id,' +
    'agency_id,' +
    'client_type_id,' +
    'visit_call,' +
    'visit_AM,' +
    'visit_PM,' +
    'site_tour_AM,' +
    'site_tour_PM,' +
    'lunch,' +
    'dinner,' +
    'others) values (?)'
  config.get_connect.query(sqlString, [data], (error, result) => {
    if (error) {
      (process.env.NODE_ENV === 'development') ? console.log(error) : null
    } else {
      res.send(result)
    }
  })
}
//@router count activity api/timeline/count/:id/:id2
exports.getPostCountById = (req, res) => {
  const brick = req.params
  const accountId = JSON.parse(brick.id)
  let clientType = (brick.id2)
  if (clientType === 'null') { clientType = '' }
  const sqlString = `SELECT
  COUNT(client_type) AS ClientTypeId,
  SUM(visit_call) AS VisitCall,
  SUM(visit_AM) AS VisitAM,
  SUM(visit_PM) AS VisitPM,
  SUM(site_tour_AM) AS SiteTourAM,
  SUM(site_tour_PM) AS SiteTourPM,
  SUM(lunch) AS Lunch,
  SUM(dinner) AS Dinner,
  COUNT(others) AS Others
FROM
 v_timeline where account_id = '${accountId.value}' and client_type LIKE '${clientType}%'`
  config.get_connect.query(sqlString, (error, result) => {
    if (error) {
      (process.env.NODE_ENV === 'development') ? console.log(error) : null
    } else {
      res.send(result)
    }

  })
}
//@router DELETE api/timeline/:id
exports.deletePostById = (req, res) => {
  const brick = req.params
  const id = brick.id
  const sqlString = `delete from timeline where id = '${id}'`
  config.get_connect.query(sqlString, (error, result) => {
    if (error) {
      (process.env.NODE_ENV === 'development') ? console.log(error) : null
    } else {
      res.send(result)
    }
  })
}
