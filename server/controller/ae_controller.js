const { message } = require("./messaged_controller");

//Read
exports.ae = (req, res, next) => {
    const key = JSON.parse(req.query.key)
    const activity = key.state
    const code = key.code
    switch (activity) {
        case 'read':
            conn.query('select id, fullName, state from ae where state not in ("GM","disable")',
                (error, result) => {
                    if (error) {
                        alert_message = 'Unsuccessfully: ' + error.sqlMessage
                        const text = { code, type: 'read', error: error.sqlMessage }
                        save_log_file('ae', text)
                    } else {
                        res.send(result)
                        alert_message = 'successfully'
                        const text = { code, info: 'read successfully' }
                        save_log_file('ae', text)
                    }
                })
            break;
        default:
            break;
    }
}

//create
exports.ae_ = (req, res, next) => {

    const key = JSON.parse(req.query.key)
    const activity = key.state
    const code = key.code
    console.log(key);

    switch (activity) {
        case 'create':
            try {
                const data = Object.values(req.body.getValue)
                conn.query('insert into ae (userCode,firstName,lastName,password,state) value (?)',
                    [data], (error, result) => {
                        if (error) {
                            alert_message = 'Unsuccessfully: ' + error.sqlMessage
                            const text = { code, type: 'create', error: error.sqlMessage }
                            save_log_file('ae', text)
                        } else {
                            res.send(result)
                            alert_message = 'successfully'
                            const text = { code, info: 'create successfully' }
                            save_log_file('ae', text)
                        }
                    })
            } catch (error) {

            }

            break;
        case 'update':
            try {
                const id = req.body.id
                conn.query(`update ae set password = "1234" where id="${id}"`,
                    (error, result) => {
                        if (error) {
                            alert_message = 'Unsuccessfully: ' + error.sqlMessage
                            const text = { code, type: 'reset password', error: error.sqlMessage }
                            save_log_file('ae', text)
                        } else {
                            res.send(result)
                            alert_message = 'successfully'
                            const text = { code, info: 'reset password successfully' }
                            save_log_file('ae', text)
                        }
                    })

            } catch (error) {

            }
            break
        case 'disable':
            try {
                const id = req.body.id
                conn.query(`update ae set state = "disable" where id="${id}"`,
                    (error, result) => {
                        if (error) {
                            alert_message = 'Unsuccessfully: ' + error.sqlMessage
                            const text = { code, type: 'disable account', error: error.sqlMessage }
                            save_log_file('ae', text)
                        } else {
                            res.send(result)
                            alert_message = 'successfully'
                            const text = { code, info: 'disable account successfully' }
                            save_log_file('ae', text)
                        }
                    })

            } catch (error) {

            }
            break
        default:
            break
    }
}

