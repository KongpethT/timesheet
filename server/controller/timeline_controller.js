const { config } = require('../configure/env')


// @route   GET api/timeline
// @desc    Get All Posts
// @access  Public
exports.getPosts = (req, res) => {
  //console.log('work this here 1');
}

// @route   GET api/timeline /:id
// @desc    Gets a post by ID
// @access  Private
exports.getPostById = (req, res) => {
  const brick = JSON.parse(req.params.id)
  const account_id = brick.value
  const sqlString = `select * from v_timeline where account_id = '${account_id}'`
  config.get_connect.query(sqlString,
    (error, result) => {
      (process.env.NODE_ENV === 'development') ? console.log(error) : null
      res.send(result)
    })
}

//@route POST api/timeline/:id
//@desc Posts 
//@access Private
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
    (process.env.NODE_ENV === 'development') ? console.log(error) : null
    console.log(result)
    res.send(result)
  })
}
