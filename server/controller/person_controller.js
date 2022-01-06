const { config } = require("../configure/env")

//@router get api/person
exports.getPosts = (req, res) => {


}
//@router get api/person/:id
exports.getPostById = (req, res) => {

}

//@router post api/person
exports.postPosts = (req, res) => {
    const brick = req.body.getValue
    const data = Object.keys(brick).map((key) => {
        return (brick[key])
    })
    const sqlString = `INSERT INTO account (user_code, firstName, lastName, password, user_state) value (?)`
    config.get_connect.query(sqlString, [data], (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    })
}
/**
 * userCode: '0197',
  firstName: 'Weerawan ',
  lastName: 'Dechama',
  password: 'U2FsdGVkX182CTZzfU1xfr37Ys3ApUI5x3oHLu7I9tM=',
  userState: 'user'
 */