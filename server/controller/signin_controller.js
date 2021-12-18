
exports.signin = (req, res) => {
    const isAccount = req.body.getAccount

    conn.query(`select * from ae where userCode ='${isAccount.username}' and password='${isAccount.password}'`, (error, result) => {
        if (error) {
            const text = { user: isAccount.username, type: 'login', error: error.sqlMessage }
            save_log_file('login', text)
        } else {
            const token = jwt.sign({
                id: isAccount.username
            }, config.secretKey, { expiresIn: config.expires_in }) //{ expiresIn: 3600 })
            if (JSON.stringify(result).length > 2) {
                brick = { ...result, token }
                const text = { user: isAccount.username, type: 'login successfully' }
                save_log_file('login', text)
                console.log(brick);
                res.send(brick)
            } else {
                const text = { user: isAccount.username, type: 'login unsuccessfully' }
                save_log_file('login', text)
            }

        }
    })

}