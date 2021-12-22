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
                        alert_message = 'successfully'
                        const text = { user: isUserCode, type: 'chenged password successfully' }
                        save_log_file('password', text)
                    }
                })
        } else {
            alert_message = 'unsuccessfully'
            const text = { user: isUserCode, type: 'chenged password unsuccessfully' }
            save_log_file('password', text)
        }
    }
    //isCheck(isUpdate)

}
//
