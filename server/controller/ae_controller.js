
//method get
exports.ae = (req, res, next) => {
    const key = JSON.parse(req.query.key)
    const activity = key.state
    const code = key.code
    switch (activity) {
        case 'read':
            conn.query('select id, userCode, firstName,lastName,fullName, state from ae where state not in ("GM","disable")',
                (error, result) => {
                    if (error) {
                        alert_message = 'Unsuccessfully: ' + error.sqlMessage
                        const text = { code, type: 'read', error: error.sqlMessage }
                        save_log_file('ae', text)
                    } else {
                        alert_message = 'successfully'
                        const text = { code, info: 'read successfully' }
                        save_log_file('ae', text)
                        res.send(result)
                    }
                })
            break;
        default:
            break;
    }
}

//method post
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
        case 'update_password':
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
        case 'disable_state':
            try {
                const id = req.body.id
                conn.query(`update ae set state = "disable" where id="${id}"`,
                    (error, result) => {
                        if (error) {
                            alert_message = 'Unsuccessfully: ' + error.sqlMessage
                            const text = { code, type: 'disable account', error: error.sqlMessage }
                            save_log_file('ae', text)
                        } else {
                            alert_message = 'successfully'
                            const text = { code, info: 'disable account successfully' }
                            save_log_file('ae', text)
                            res.send(result)
                        }
                    })

            } catch (error) {

            }
            break
        case 'update':
            const brick = JSON.parse(req.query.key)
            const row = brick.getRow
            conn.query(`update ae set userCode='${row.code}', firstName='${row.firstname}',lastName='${row.lastname}', state='${row.state}' where id='${row.id}'`,
                (error, result) => {
                    if (error) {
                        alert_message = 'Unsuccessfully: ' + error.sqlMessage
                        const text = { code, type: 'upgrade row', error: error.sqlMessage }
                        save_log_file('ae', text)
                    } else {
                        alert_message = 'successfully'
                        const text = { code, info: 'upgrade row successfully' }
                        save_log_file('ae', text)
                        res.send(result)
                    }
                })

            break
        default:
            break
    }
}

