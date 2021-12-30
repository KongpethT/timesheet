const { config } = require('../configure/env')
const sql_string = 'select * from timeline'
const view_string = 'select * from v_timeline'

// @route   GET api/posts
// @desc    Get All Posts
// @access  Public
exports.getPosts = (req, res) => {
  //console.log('work this here 1');
}

// @route   GET api/posts /:id
// @desc    Gets a post by ID
// @access  Private
exports.getPostById = (req, res) => {
  const brick = JSON.parse(req.params.id)
  const accout_id = brick.value
  config.get_connect.query(`${view_string} where account_id = '${accout_id}'`,
    (error, result) => {
      console.log(process.env.NODE_ENV);
      (process.env.NODE_ENV === 'development') ? console.log(error) : null
      res.send(result)
    })
}


