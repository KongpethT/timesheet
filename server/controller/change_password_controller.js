const { myDecrypt, myEncrypt } = require('../configure/crypto')

require('../configure/crypto')



exports.change_password = (req, res) => {
    res.send('')
}

exports.change_password_ = (req, res) => {
    const brick = req.body.getPassword
    const isCompare = brick.oldPassword
    const isPassword = myEncrypt(brick.newPassword)
    const isUserCode = brick.userCode

    conn.query(`select password from ae where userCode ='${isUserCode}'`,
        (error, result, next) => {
            if (error) {
                alert_message = 'Unsuccessfully: ' + error.sqlMessage
            } else {
                const isCurrent = myDecrypt(result[0].password)
                this.value = (isCurrent === isCompare)
            }
            isUpdate(this.value)
        })

    const isUpdate = (value) => {
        if (value === true) {
            conn.query(`update ae set password ='${isPassword}' where userCode = '${isUserCode}'`,
                (error, result) => {
                    if (error) {
                        alert_message = 'Unsuccessfully: ' + error.sqlMessage
                    } else {
                        if (result.affectedRows != 0) {
                            alert_message = { error: false, message: 'successfully', result }//'successfully'
                            const text = { user: isUserCode, type: 'chenged password successfully' }
                            save_log_file('password', text)
                            console.log('successfully');
                            res.send(result)
                        } else {
                            alert_message = { error: true, message: 'unsuccessfully', result }//'successfully'
                            const text = { user: isUserCode, type: 'chenged password unsuccessfully' }
                            save_log_file('password', text)
                            console.log('unsuccessfully');
                            res.send(result)
                        }
                    }
                })
        } else {
            const result = {
                "error": true,
                "message": "unsuccessfully",
                "result": {
                    "fieldCount": 0,
                    "affectedRows": 0,
                    "insertId": 0,
                    "info": "Rows matched: 0  Changed: 0  Warnings: 0",
                    "serverStatus": 2,
                    "warningStatus": 0,
                    "changedRows": 0
                }
            }
            alert_message = { error: true, message: 'unsuccessfully', result }//'successfully'
            res.send(result.result)
        }
    }
    //isCheck(isUpdate)

}
//
