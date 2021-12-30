const jwt = require('jsonwebtoken')
const { config } = require("../configure/env");
const sql_string = 'select * from account order by fullName'

// @route   GET api/posts
// @desc    Get All Posts
// @access  Public
exports.getPosts = (req, res) => { }

// @route   GET api/posts /:id
// @desc    Gets a post by ID
// @access  Private
exports.getPostById = (req, res) => { }

// @route   GET api/posts/:user/:password
// @desc    Gets a post by ID
// @access  Private
exports.getPostByLogin = (req, res) => {
    const name = req.params.name
    const password = req.params.password
    config.get_connect.query(sql_string, (error, result, fields) => {
        const values = {
            user_code: result[0].user_code,
            user_state: result[0].user_state,
            full_name: result[0].fullName,
            email_id: result[0].email,
            account_id: result[0].id
        }
        if (error) throw error;
        const dr = [result[0]]
        dr.filter((row) => {
            if (row.email === name) {
                if (password === config.get_decrypt(row.password)) {
                    let token = jwt.sign(values, config.get_key_encrypt, {
                        expiresIn: '8h' // expires in 8 hours
                    })
                    const obj = { values, token }
                    res.send(obj)
                }
            }
        })
    })
}
