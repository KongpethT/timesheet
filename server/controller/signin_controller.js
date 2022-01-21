const jwt = require('jsonwebtoken')
const { config } = require("../configure/env");


// @route   GET api/posts
exports.getPosts = (req, res) => { }

// @route   GET api/posts /:id
exports.getPostById = (req, res) => { }

// @route   GET api/posts/:user/:password
exports.getPostByLogin = (req, res) => {//
    const brick = req.body
    //console.log('workHere');
    const email = brick.email
    const password = brick.password
    const sqlString = `select * from account where email = '${email}'`
    config.get_connect.query(sqlString, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            if (result.length === 0) {
                res.send({ error: 401 })
            } else {
                const values = {
                    user_code: result[0].user_code,
                    user_state: result[0].user_state,
                    full_name: result[0].fullName,
                    email_id: result[0].email,
                    account_id: result[0].id
                }

                const storePassword = [result[0].password]
                if (password === config.get_decrypt(storePassword[0])) {
                    let token = jwt.sign(values, config.get_key_encrypt, {
                        expiresIn: '1h' // expires in 1 hours
                    })
                    const obj = { values, token }
                    res.send(obj)
                } else {
                    res.send({ error: 401 })
                }
            }
        }
    })
}
