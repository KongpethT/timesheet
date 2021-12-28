global.jwt = require('jsonwebtoken')
const { config } = require("../configure/env");

exports.signin = (req, res) => {
    const value = req.body.getAccount
    const isUsername = value.username
    const isPassword = value.password

    config.get_connect.query(`select user_code, user_state, fullName, email, password from account where email ='${isUsername}'`,
        (error, result) => {
            if (error) {
                alert_message = config.get_sql_err_message(error)
                res.send(error)
            } else {
                alert_message = config.get_sql_res_message()
                const brick = result[0];
                const data = {
                    user_code: brick.user_code,
                    user_state: brick.user_state,
                    full_name: brick.fullName,
                    email_id: brick.email
                }
                const password = config.get_decrypt(brick.password)
                if (password === isPassword) {
                    let token = jwt.sign(data, config.get_key_encrypt, {
                        expiresIn: '8h' // expires in 8 hours
                    });
                    const obj = { data, token }
                    res.send(obj)
                }
            }
        }
    )
}