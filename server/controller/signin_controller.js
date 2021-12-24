const { myDecrypt } = require('../configure/crypto');

require('../configure/crypto')
exports.signin = (req, res) => {
    const value = req.body.getAccount
    const isUsername = value.username
    const isPassword = value.password

    console.log(value);
    conn.query(`select * from ae where email ='${isUsername}'`,
        (error, result) => {
            if (error) {
                alert_message = { true: false, message: 'unsuccessfully', error }
                const text = { user: isUsername, type: 'login successfully' }
                save_log_file('login', text)
                res.send(error)
            } else {
                const brick = result[0];
                const password = myDecrypt(brick.password)
                if (password === isPassword) {
                    const token = jwt.sign({
                        id: isUsername
                    }, config.secretKey, { expiresIn: config.expires_in }) //{ expiresIn: 3600 })
                    const brick = { ...result, token }
                    const text = { user: isUsername, type: 'login successfully' }
                    save_log_file('login', text)
                    res.send(brick)
                } else {
                    const text = { user: isUsername, type: 'login unsuccessfully' }
                    save_log_file('login', text)
                }
            }
        })
}