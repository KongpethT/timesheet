const { config } = require("../configure/env")

//@router get api/person
exports.getPosts = (req, res) => {
    const sqlString = `SELECT  id, user_code, fullName, email, user_state FROM account WHERE user_state NOT IN ('gm','disable')`
    config.get_connect.query(sqlString, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    })
}
//@router get api/person/:id
exports.getPostById = (req, res) => { }
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
//@router post api/resetPassword
exports.postPostResetPassword = (req, res) => {
    const brick = req.body
    const id = brick.value.id
    const password = brick.value.password
    const myPassword = config.set_encrypt(password)
    //console.log(myPassword);
    const sqlString = `UPDATE account set password = '${myPassword}' where id = '${id}'`
    config.get_connect.query(sqlString, ((error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    }))

}
//@router post api/changedPassword
exports.postPostChangePassword = (req, res) => {
    const brick = req.body
    const current = brick.getBrick.current
    const password = config.set_encrypt(brick.getBrick.new)
    const id = brick.getBrick.id
    let isChecked = false
    const sqlString = ` SELECT password from account where id = ${id}`
    config.get_connect.query(sqlString, (error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            const dbPassword = config.get_decrypt(result[0].password)
            isChecked = (current === dbPassword)
            if (isChecked) {
                config.get_connect.query(`update account set password = '${password}' where id = '${id}'`)
                res.send('change a password successfully')
            } else {
                res.send('old passwords do not match.')
            }
        }
    })





    //const id = brick.value.id

    //const password = brick.value.password
    //const myPassword = config.set_encrypt(password)
    /*
    const sqlString = `UPDATE account set password = '${myPassword}' where id = '${id}'`
    config.get_connect.query(sqlString, ((error, result) => {
        if (error) {
            (process.env.NODE_ENV === 'development') ? console.log(error) : null
        } else {
            res.send(result)
        }
    }))
*/
}