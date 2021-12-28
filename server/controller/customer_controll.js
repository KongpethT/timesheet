const { get_error, get_success } = require('../configure/sql_message')

const table = 'businessprofile'

exports.read = (req, res) => {
    res.send()
}

exports.create = (req, res) => {
    const brick = req.body
    const data = brick.getAddress
    conn.query(`insert into from ${table} (name,email,contact,address,address2,city,state,zip,userCode) value (?)`,
        [data], (error, result) => {
            if (error) {
                alert_message = get_error(error)
                console.log(error);
            } else {
                alert_message = get_success(result)
                console.log(result)
                res.send(result)
            }
        })
}

exports.update = (req, res) => {
    res.send()
}

exports.delete = (req, res) => {
    res.send()
}